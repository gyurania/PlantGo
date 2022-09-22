package com.ssafy.plantgo.model.dto;

import com.ssafy.plantgo.model.entity.Rank;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRankResponse {

    @ApiModelProperty("RankList")
    private Optional<List<Rank>> rankList;
}
