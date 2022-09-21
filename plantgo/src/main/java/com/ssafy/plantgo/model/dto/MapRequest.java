package com.ssafy.plantgo.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@ApiModel("MapRequest")
@Builder
@AllArgsConstructor
public class MapRequest {

   private String area;

}
