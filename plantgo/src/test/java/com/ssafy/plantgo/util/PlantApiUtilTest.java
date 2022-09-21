package com.ssafy.plantgo.util;

import com.ssafy.plantgo.model.entity.Plant;
import com.ssafy.plantgo.model.repository.PlantRepository;
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

    @Test
    public void insertPlant(){
        PlantApiUtil plantApiUtil = new PlantApiUtil(plantRepository);

        for(int i=41; i<=50; i++){
            plantApiUtil.insertPlant(i);

        }
    }
}