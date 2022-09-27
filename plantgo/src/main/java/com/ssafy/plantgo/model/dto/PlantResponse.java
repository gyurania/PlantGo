package com.ssafy.plantgo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantResponse {
    @Builder.Default
    List<PlantDto> plantDtoList = new ArrayList<>();
    int totalPage;
    long totalCnt;
    int size;
}
