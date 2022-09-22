package com.ssafy.plantgo.util;

import com.ssafy.plantgo.model.dto.PhotocardRequest;
import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.entity.Plant;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.repository.PhotocardRepository;
import com.ssafy.plantgo.model.repository.PlantRepository;
import com.ssafy.plantgo.model.repository.UserRepository;
import com.ssafy.plantgo.model.service.PhotocardService;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.util.List;

@SpringBootTest
public class PhotocardDummyTest {

    //    private final String url = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=127.0395466,37.5038118&output=json";
    @Autowired
    public PlantRepository plantRepository;

    @Autowired
    public PhotocardService photocardService;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public PhotocardRepository photocardRepository;

    @Test
    public void insertDummy() {
        StringBuilder sb = new StringBuilder();
        for (int tc = 1; tc <= 1000000; tc++) {

            /** API URL 초기화 */
            sb.setLength(0);

            /** 남한 124.36 ~ 131.52 && 33.45 ~ 37 */
            /** 랜덤 위치 설정 */
            double longtitude = (Math.random() * 5) + 33;
            double latitude = (Math.random() * 9) + 124;
            if (longtitude < 33.45 || longtitude > 37)
                continue;
            if (latitude < 124.36 || latitude > 131.52)
                continue;
            sb.append("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=");
            longtitude = Math.floor(longtitude * 1000000) / 1000000.0;
            latitude = Math.floor(latitude * 1000000) / 1000000.0;
            sb.append(latitude).append(",").append(longtitude).append("&output=json");
            System.out.println(sb.toString());

            /** 랜덤 위,경도로 자치구 알아오기 */

            HttpClient client = HttpClientBuilder.create().build();
            HttpGet httpGet = new HttpGet(sb.toString());
            httpGet.addHeader("X-NCP-APIGW-API-KEY-ID", "6s70rnjtot");
            httpGet.addHeader("X-NCP-APIGW-API-KEY", "uDvd8ChhbkZbYjXX1z7y88hd3bZEiLEzYtN8kiiq");

            HttpResponse response;
            try {
                response = client.execute(httpGet);
                String jsonString = EntityUtils.toString(response.getEntity());
                System.out.println(jsonString);
                JSONObject jsonObj = new JSONObject(jsonString);
                JSONObject status = jsonObj.getJSONObject("status");
                if (status.getInt("code") != 0) {
                    sb.setLength(0);
                    continue;
                }
                JSONArray resultarr = jsonObj.getJSONArray("results");
                JSONObject result = resultarr.getJSONObject(0);
                JSONObject region = result.getJSONObject("region");
                JSONObject area2 = region.getJSONObject("area2");
                String name = area2.getString("name");
                System.out.println(name);
                if (name.length()<3) // 이름 없는경우도 패스
                    continue;

                /** Query로 식물 랜덤 뽑기 */
                System.out.println("JPA Query로 식물 랜덤 뽑기");
                List<Plant> list = plantRepository.findAll();
                Plant plant = list.get(0);
                if (plant.getImgUrl().equals("NONE")) // 이미지가 없으면 패스
                    continue;
                String photoUrl = plant.getImgUrl();

                /** userSeq랜덤 추출 */
                System.out.println("userSeq랜덤추출");
                int numberOfUser = userRepository.countUser();
                System.out.println("현재유저몇명? " + numberOfUser);
                Long userSeq = (long)((int) ((Math.random() * 8) + 1));

                if(User.builder().userSeq(userSeq).build()==null)
                    continue;

                /** 뽑은 식물 + 랜덤 지역 + 랜덤 userSeq 조합해서 photocard 만들기 */
                System.out.println("photocard만들기");
                PhotoCard photocard = PhotoCard.builder()
                        .memo(name + "에서 찾았다!! 나도 곧 식물박사!!")
                        .latitude(latitude)
                        .longitude(longtitude)
                        .user(User.builder().userSeq(userSeq).build())
                        .photoUrl(photoUrl)
                        .area(name)
                        .plantId(plant.getPlantId())
                        .build();
                photocardRepository.save(photocard);

                System.out.println("photocard 저장완료!");

            } catch (IOException e) {
                throw new RuntimeException(e);
            }



        }


    }
}
