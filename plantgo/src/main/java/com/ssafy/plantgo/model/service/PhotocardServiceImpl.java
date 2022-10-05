package com.ssafy.plantgo.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.plantgo.model.dto.*;
import com.ssafy.plantgo.model.entity.Plant;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.repository.MapRepository;
import com.ssafy.plantgo.model.repository.PlantRepository;
import com.ssafy.plantgo.model.repository.UserRepository;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.repository.PhotocardRepository;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotocardServiceImpl implements PhotocardService {

    private final PhotocardRepository photocardRepository;
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;
    private final ModelMapper modelMapper;
    private final MapRepository mapRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;



    public static String sendPostRequest(String urlString, JSONObject data) throws Exception {
        java.net.URL url = new URL(urlString);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        con.setDoOutput(true);
        con.setDoInput(true);
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");

        OutputStream os = con.getOutputStream();
        os.write(data.toString().getBytes());
        os.close();

        InputStream is = con.getInputStream();
        String response = new String(IOUtils.toByteArray(is));

        System.out.println("Response code : " + con.getResponseCode());
        System.out.println("Response : " + response);
        con.disconnect();
        return response;
    }
    /**
     * 포토카드 등록하기
     */
    @Override
    public PhotocardResponse registPhotocard(PhotocardRequest photocardRequest, MultipartFile img) throws IOException {


        System.out.println("이미지의 이름은 ");
        System.out.println(img.getName());
        /** planetID API */
        String scientificName = "";
        BufferedImage image = ImageIO.read(img.getInputStream());
        String imageType = img.getContentType();
        System.out.println("contentType은 ? ?");
        System.out.println(imageType);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, imageType, baos);
        String encodedImage = Base64.encode(baos.toByteArray());
        String apiKey = "IoMPgMn0fWIlD5rjBSHMUpR7NblA5rZI93gAjXyVTUWJqrhzgD";
        System.out.println(encodedImage);
        JSONObject data = new JSONObject();
        data.put("api_key", apiKey);
        JSONArray images = new JSONArray();
        images.put(encodedImage);
        data.put("images", images);

        JSONArray modifiers = new JSONArray()
                .put("crops_fast")
                .put("similar_images");
        data.put("modifiers", modifiers);
        data.put("plant_language", "en");

        // add plant details
        // more info here: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
        JSONArray plantDetails = new JSONArray()
                .put("common_names")
                .put("url")
                .put("name_authority")
                .put("wiki_description")
                .put("taxonomy")
                .put("synonyms");
        data.put("plant_details", plantDetails);
        String res = "";
        try {
            res = sendPostRequest("https://api.plant.id/v2/identify", data);
            JSONObject jsonObj = new JSONObject(res);
            JSONArray suggestions = jsonObj.getJSONArray("suggestions");
            JSONObject plantdetail = suggestions.getJSONObject(0).getJSONObject("plant_details");
            scientificName = plantdetail.getString("scientific_name");

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        System.out.println(res);
        System.out.println(scientificName);

        /** 학명으로 가져오기 */
        Plant plant = null;
        try {
            plant = plantRepository.findByScientificname(scientificName);
        } catch(NullPointerException e) {
            e.printStackTrace();
            return null;
        }
        if (plant == null || plant.getKorName() == null)
            return null;
        if (plant.getKorName().length()==0)
            return null;
        System.out.println("식물 한글 이름");
        System.out.println(plant.getKorName());
        /** 토큰에서 유저정보 가져오기 */
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUserId(principal.getUsername());

        /** 위,경도 값으로 area가져오기 */
        StringBuilder sb = new StringBuilder();
        sb.append("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=");
        sb.append(photocardRequest.getLongitude()).append(",").append(photocardRequest.getLatitude()).append("&output=json");
        System.out.println(sb.toString());

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet httpGet = new HttpGet(sb.toString());
        httpGet.addHeader("X-NCP-APIGW-API-KEY-ID", "6s70rnjtot");
        httpGet.addHeader("X-NCP-APIGW-API-KEY", "uDvd8ChhbkZbYjXX1z7y88hd3bZEiLEzYtN8kiiq");
        HttpResponse httpResponse;
        String areaname = "";
        try {
            httpResponse = httpClient.execute(httpGet);
            String jsonString = EntityUtils.toString(httpResponse.getEntity());
            System.out.println(jsonString);
            JSONObject jsonObj = new JSONObject(jsonString);
            JSONObject status = jsonObj.getJSONObject("status");
            JSONArray resultarr = jsonObj.getJSONArray("results");
            JSONObject result = resultarr.getJSONObject(0);
            JSONObject region = result.getJSONObject("region");
            JSONObject area2 = region.getJSONObject("area2");
            areaname = area2.getString("name");
            System.out.println(areaname);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        String photoUrl = upload(img);
		/** 포토카드 저장 */
        PhotoCard photocard = PhotoCard.builder()
                .latitude(photocardRequest.getLatitude())
                .longitude(photocardRequest.getLongitude())
                .user(user)
                .photoUrl(photoUrl)
                .area(areaname)
                .korName(plant.getKorName())
                .plantId(plant.getPlantId())
                .build();
        photocardRepository.save(photocard);
        PhotocardResponse photocardResponse = modelMapper.map(photocard, PhotocardResponse.class);
		photocardResponse.setKor_name(plant.getKorName());
        photocardResponse.setContent(plant.getFlwrDesc());
        return photocardResponse;
    }


    @Override
    public String upload(MultipartFile multipartFile) throws IOException {
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
        System.out.println("s3파일이름은?? " + s3FileName);
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

    @Override
    public PhotocardResponse updatePhotocard(PhotocardUpdateRequest photocardUpdateRequest, int photocard_id) {
        PhotoCard photocard = photocardRepository.getById(photocard_id);
        photocard.setMemo(photocardUpdateRequest.getMemo());
        photocardRepository.save(photocard);
        PhotocardResponse photocardResponse = modelMapper.map(photocard, PhotocardResponse.class);
        photocardResponse.setSch_name(plantRepository.findByPlantId(photocard.getPlantId()).getSchName());
        photocardResponse.setKor_name(plantRepository.findByPlantId(photocard.getPlantId()).getKorName());
        return photocardResponse;
    }

    @Override
    public PhotocardListResponse getPhotocards(User user, int plantId) {
        Optional<List<PhotoCard>> photocardList = photocardRepository.findByUserAndPlantId(user, plantId);
        PhotocardListResponse response = new PhotocardListResponse(photocardList);
        return response;
    }

    @Override
    public MapResponse getPhotocardsByArea(AreaRequest areaRequest) {
        StringBuilder sb = new StringBuilder();
        System.out.println("Latitude : "+areaRequest.getLatitude());
        System.out.println("Longitude : "+areaRequest.getLongitude());
        sb.append("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=");
        sb.append(areaRequest.getLongitude()).append(",").append(areaRequest.getLatitude()).append("&output=json");
        HttpClient client = HttpClientBuilder.create().build();
        System.out.println(sb.toString());
        HttpGet httpGet = new HttpGet(sb.toString());
        httpGet.addHeader("X-NCP-APIGW-API-KEY-ID", "6s70rnjtot");
        httpGet.addHeader("X-NCP-APIGW-API-KEY", "uDvd8ChhbkZbYjXX1z7y88hd3bZEiLEzYtN8kiiq");
        String area = "";
        HttpResponse response;
        try {
            response = client.execute(httpGet);
            String jsonString = EntityUtils.toString(response.getEntity());
            System.out.println(jsonString);
            JSONObject jsonObj = new JSONObject(jsonString);
            JSONObject status = jsonObj.getJSONObject("status");
            JSONArray resultarr = jsonObj.getJSONArray("results");
            JSONObject result = resultarr.getJSONObject(0);
            JSONObject region = result.getJSONObject("region");
            JSONObject area2 = region.getJSONObject("area2");
            area = area2.getString("name");
            System.out.println("area : " + area);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Optional<List<PhotoCard>> photocardList = mapRepository.findByArea(area);
        MapResponse mapResponse = new MapResponse(photocardList);
        return mapResponse;
    }



}
