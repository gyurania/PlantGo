package com.ssafy.plantgo.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.plantgo.model.dto.*;
import com.ssafy.plantgo.model.entity.Plant;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.repository.PhotocardRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotocardServiceImpl implements PhotocardService {

    private final PhotocardRepository photocardRepository;
    private final PlantRepository plantRepository;
    private final ModelMapper modelMapper;

    private static final String PlantNetApi = "https://my-api.plantnet.org/v2/identify/all?api-key=2b10gA30OhZUKxTfs01xa0Tgh";
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    /**
     * 포토카드 등록하기
     */
    @Override
    public PhotocardResponse registPhotocard(PhotocardRequest photocardRequest, MultipartFile img) throws IOException {
        String photoUrl = upload(img);

        String scientificName = "";
        /** 사진으로 식물의 학명 찾아오기 */

//        File file = new File(photoUrl);
        // 멀티파일을 파일형태로 변환
        File f = null;
        int n;
        f = new File(img.getOriginalFilename());
        try (InputStream in  = img.getInputStream(); OutputStream os = new FileOutputStream(f)){
            //      。
            //     byte[] ss = multipartFile.getBytes();  while
            byte[] buffer = new byte[4096];
            while ((n = in.read(buffer,0,4096)) != -1){
                os.write(buffer,0,n);
            }
            //
            BufferedReader bufferedReader = new BufferedReader(new FileReader(f));
            System.out.println(bufferedReader.readLine());
            //
            bufferedReader.close();
        }catch (IOException e){
            e.printStackTrace();
        }
        File file = new File(f.toURI());

//        File file = new File("C:\\Users\\SSAFY\\Desktop\\zeph.jpg");
        HttpEntity entity = MultipartEntityBuilder.create()
                .addPart("images", new FileBody(file))
                .addTextBody("organs", "flower")
//                .addPart("images", new FileBody(file2)).addTextBody("organs", "leaf")
                .build();



        HttpPost request = new HttpPost(PlantNetApi);
        request.setEntity(entity);

        HttpClient client = HttpClientBuilder.create().build();
        HttpResponse response;
        try {
            response = client.execute(request);
            String jsonString = EntityUtils.toString(response.getEntity());
            System.out.println("Json형태의 리턴값");
            System.out.println(jsonString);
            System.out.println();
            JSONObject jsonObj = new JSONObject(jsonString);
            JSONArray resultarr = jsonObj.getJSONArray("results");
            JSONObject mostcorrect = resultarr.getJSONObject(0);
            JSONObject species = mostcorrect.getJSONObject("species");
            scientificName = species.getString("scientificNameWithoutAuthor");
            System.out.println(scientificName);

        } catch (IOException e) {
            e.printStackTrace();
        }

		Plant plant = plantRepository.findByScientificname(scientificName);
        System.out.println("식물 한글 이름");
        System.out.println(plant.getKorName());

		/** 포토카드 저장 */
        PhotoCard photocard = PhotoCard.builder()
                .latitude(photocardRequest.getLatitude())
                .longitude(photocardRequest.getLongitude())
                .user(User.builder().userSeq(photocardRequest.getUserSeq()).build())
                .photoUrl(photoUrl)
                .area(photocardRequest.getArea())
                .plantId(plant.getPlantId())
                .build();
        photocardRepository.save(photocard);
        PhotocardResponse photocardResponse = modelMapper.map(photocard, PhotocardResponse.class);
		photocardResponse.setKor_name(plant.getKorName());

        return photocardResponse;
    }


    @Override
    public String upload(MultipartFile multipartFile) throws IOException {
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

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
        return photocardResponse;
    }

    @Override
    public PhotocardListResponse getPhotocards(User user) {
        Optional<List<PhotoCard>> photocardList = photocardRepository.findByUser(user);
        PhotocardListResponse response = new PhotocardListResponse(photocardList);
        return response;
    }

    @Override
    public Optional<PhotoCard> getPhotocardbyID(int photocard_id) {
        Optional<PhotoCard> photocard = photocardRepository.findById(photocard_id);
        return photocard;
    }


}
