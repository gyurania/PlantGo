package com.ssafy.plantgo.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhotocardRequest {

    private double latitude;
    private double longitude;


}
