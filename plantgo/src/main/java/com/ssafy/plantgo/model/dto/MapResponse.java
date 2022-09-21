package com.ssafy.plantgo.model.dto;

import com.ssafy.plantgo.model.entity.PhotoCard;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
@ApiModel("MapPhotocardList")
@Builder
@AllArgsConstructor
public class MapResponse {

    @ApiModelProperty("MapPhotocardList")
    private Optional<List<PhotoCard>> mapPhotocardList;
}
