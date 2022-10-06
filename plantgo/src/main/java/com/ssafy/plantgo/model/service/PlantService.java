package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.PlantResponse;

import java.util.Set;

public interface PlantService {
    PlantResponse plantList(Long userSeq, int page);
    PlantResponse plantCollected(Long userSeq, int page);
    PlantResponse plantNotCollected(Long userSeq, int page);
    Set<Integer> getPlantIds(Long userSeq);
}
