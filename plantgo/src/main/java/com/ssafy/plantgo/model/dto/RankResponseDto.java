package com.ssafy.plantgo.model.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RankResponseDto {

	private Long userSeq;

	private int plantsCollects;

	private LocalDateTime insertTime;

	private String userName;
}
