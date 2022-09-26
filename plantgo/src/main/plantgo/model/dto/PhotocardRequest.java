package com.ssafy.plantgo.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardRequest {
    private Long userSeq;
    private double latitude;
    private double longitude;
    private int plantId;

}
