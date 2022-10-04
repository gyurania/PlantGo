package com.ssafy.plantgo.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/** 포토카드 등록 시 반환하는 데이터 */

@Data
@ApiModel("PhotocardResponse")
public class PhotocardResponse {

	@ApiModelProperty(name = "PhotocardID")
	private int photocardId;

	@ApiModelProperty(name = "학명")
	private String sch_name;

	@ApiModelProperty(name = "한글명")
	private String kor_name;

	@ApiModelProperty(name = "유저번호")
	private Long userSeq;

	@ApiModelProperty(name = "식물을 발견한 위도")
	private double latitude;

	@ApiModelProperty(name = "식물을 발견한 경도")
	private double longitude;

	@ApiModelProperty(name = "사진 저장 경로")
	private String photoUrl;

	@ApiModelProperty(name = "식물 정보")
	private String content;

	@ApiModelProperty(name = "메모")
	private String memo;

	@ApiModelProperty(name = "식물도감 아이디")
	private int plantId;

	@ApiModelProperty(name = "생성시간")
	private LocalDateTime createdAt;

	@ApiModelProperty(name = "구획")
	private String area;

}
