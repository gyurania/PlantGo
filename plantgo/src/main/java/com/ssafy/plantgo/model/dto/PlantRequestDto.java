package com.ssafy.plantgo.model.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantRequestDto {
    Long userSeq;
    int page;
}
