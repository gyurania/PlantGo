package com.ssafy.plantgo.util;

import org.apache.commons.io.IOUtils;
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

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;


@SpringBootTest
public class PlantIdApiTest {

    private static final String IMAGE1 = "C:\\Users\\SSAFY\\Desktop\\zeph.jpg";
    private static final String IMAGE2 = "https://plantgo.s3.ap-northeast-2.amazonaws.com/2e6d4145-b87f-4bcf-a281-301c5863b13c-%ED%94%BC%EB%BF%8C%EB%A6%AC%ED%92%80";
    private static final String URL = "https://my-api.plantnet.org/v2/identify/all?api-key=2b10gA30OhZUKxTfs01xa0Tgh";
    @Test
    public void findPlantByImg() {

        String apiKey = "IoMPgMn0fWIlD5rjBSHMUpR7NblA5rZI93gAjXyVTUWJqrhzgD";
//        File file1 = new File(IMAGE1);
        File file = new File(IMAGE2);
        JSONObject data = new JSONObject();
        data.put("api_key", apiKey);
        JSONArray images = new JSONArray();


        data.put("images", images);

        // add modifiers
        // modifiers info: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
        JSONArray modifiers = new JSONArray()
                .put("crops_fast")
                .put("similar_images");
        data.put("modifiers", modifiers);

        // add language
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
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(res);

    }


    private static String base64EncodeFromFile(String fileString) throws Exception {
        File file = new File(fileString);
        FileInputStream fis = new FileInputStream(file);
        String res = Base64.getEncoder().encodeToString(IOUtils.toByteArray(fis));
        fis.close();
        return res;
    }

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
}
