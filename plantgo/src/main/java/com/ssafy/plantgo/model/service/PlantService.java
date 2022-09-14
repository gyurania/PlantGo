package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.PlantDto;
import com.ssafy.plantgo.model.dto.PlantResponseDto;

import java.util.List;
import java.util.UUID;

public interface PlantService {
    PlantResponseDto plantList(Long userSeq, int page);
    PlantResponseDto plantCollected(Long userSeq, int page);
    PlantResponseDto plantNotCollected(Long userSeq, int page);
    void getPlantIds(Long userSeq);
}
