package com.ssafy.plantgo.util;

import java.io.File;
import java.io.IOException;

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
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;



@SpringBootTest
public class PlantnetApiTest {

    private static final String IMAGE1 = "C:\\Users\\SSAFY\\Desktop\\zeph.jpg";
    private static final String IMAGE2 = "https:\\plantgo.s3.ap-northeast-2.amazonaws.com\\b2ac04ec-d1d1-4b43-abbd-a59ed33b1ef9-zeph.jpg";
    private static final String URL = "https://my-api.plantnet.org/v2/identify/all?api-key=2b10gA30OhZUKxTfs01xa0Tgh";
    @Test
    public void findPlantByImg() {
//        File file1 = new File(IMAGE1);
        File file2 = new File(IMAGE2);

        HttpEntity entity = MultipartEntityBuilder.create()
                .addPart("images", new FileBody(file2)).addTextBody("organs", "flower")
//                .addPart("images", new FileBody(file2)).addTextBody("organs", "leaf")
                .build();

        HttpPost request = new HttpPost(URL);
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
            String scientificName = species.getString("scientificNameWithoutAuthor");
            System.out.println(scientificName);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
