package com.ssafy.plantgo.model.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantRequest {
    Long userSeq;
    int page;
}
