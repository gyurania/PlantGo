package com.ssafy.plantgo.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/** 포토카드 등록 시 들어오는 데이터 */

@Data
@ApiModel("PhotocardDto")
public class PhotocardDto {

	@ApiModelProperty(name = "멤버 아이디")
	private String memberId;

	@ApiModelProperty(name = "식물의 국명")
	private String korName;

	@ApiModelProperty(name = "식물의 학명")
	private String schName;

	@ApiModelProperty(name = "식물을 발견한 위도")
	private double latitude;

	@ApiModelProperty(name = "식물을 발견한 경도")
	private double longitude;

	@ApiModelProperty(name = "식물 발견 주소")
	private String address;

	@ApiModelProperty(name = "사진 저장 경로")
	private String photoUrl;

	@ApiModelProperty(name = "메모")
	private String memo;

	@ApiModelProperty(name = "식물도감 아이디")
	private int plantId;

}
