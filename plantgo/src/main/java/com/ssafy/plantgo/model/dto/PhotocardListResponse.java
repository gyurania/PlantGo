package com.ssafy.plantgo.model.dto;

import com.ssafy.plantgo.model.entity.PhotoCard;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@ApiModel("PhotocardList")
@Builder
@AllArgsConstructor
public class PhotocardListResponse {

    @ApiModelProperty("List")
    private Optional<List<PhotoCard>> photocardList;
}
