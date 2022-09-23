package com.ssafy.plantgo.model.dto;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankResponse {

    @ApiModelProperty("RankList")
    private Optional<List<RankResponseDto>> rankList;
}
