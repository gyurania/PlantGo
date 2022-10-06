package com.ssafy.plantgo.model.dto;


import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@ApiModel("AreaRequest")
@Builder
@AllArgsConstructor
public class AreaRequest {

    private double latitude;
    private double longitude;
}
