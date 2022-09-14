package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.PlantDto;

import java.util.List;
import java.util.UUID;

public interface PlantService {
    List<PlantDto> plantList(UUID memberId, int page);
    List<PlantDto> plantCollected(UUID memberId, int page);
    List<PlantDto> plantNotCollected(UUID memberId, int page);
    List<Integer> getPlantIds(UUID memberId);
}
