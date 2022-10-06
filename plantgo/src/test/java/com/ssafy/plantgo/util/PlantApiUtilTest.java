package com.ssafy.plantgo.util;

import com.ssafy.plantgo.model.entity.Plant;
import com.ssafy.plantgo.model.repository.PlantRepository;
import com.ssafy.plantgo.model.service.PhotocardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PlantApiUtilTest {

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    PhotocardService photocardService;

    @Test
    public void insertPlant(){
        PlantApiUtil plantApiUtil = new PlantApiUtil(plantRepository, photocardService);

        for(int i=1; i<=1; i++){
            plantApiUtil.insertPlant(i);

        }
    }
}