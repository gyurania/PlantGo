package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.PlantResponse;

public interface PlantService {
    PlantResponse plantList(Long userSeq, int page);
    PlantResponse plantCollected(Long userSeq, int page);
    PlantResponse plantNotCollected(Long userSeq, int page);
    void getPlantIds(Long userSeq);
}
