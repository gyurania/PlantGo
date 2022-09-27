package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.model.dto.*;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.plantgo.model.service.PhotocardService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photocard")
public class PhotocardController {

	private final PhotocardService photocardService;
	private final UserService userService;

	/** 포토카드 등록하기 */
	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@ApiOperation(value="포토카드 등록", notes="img 파일과 userSeq, latitude, longitude, plantId, area 정보 필요")
	public ResponseEntity<PhotocardResponse> photocardRegist(@RequestPart PhotocardRequest photocardRequest, @RequestPart MultipartFile img) {
		try {
			String url = photocardService.upload(img);
			PhotocardResponse photocardResponse = photocardService.registPhotocard(photocardRequest, img);
			return ResponseEntity.ok(photocardResponse);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(null);
	}

	/** 위도 경도로 포토카드 가져오기 */
	@PostMapping("/map")
	@ApiOperation(value="위도, 경도로 포토카드 가져오기", notes="longitude, latitude 정보 필요")
	public ResponseEntity<MapResponse> getPhotocardsByArea(@RequestBody AreaRequest areaRequest) {
		MapResponse response = photocardService.getPhotocardsByArea(areaRequest);
		return ResponseEntity.ok(response);
	}


	/** 해당 유저의 모든 포토카드 가져오기 */
	@GetMapping
	@ApiOperation(value="해당 유저의 모든 포토카드 가져오기", notes="딱히 넘겨줄 것 없음")
	public ResponseEntity<PhotocardListResponse> getAllPhotocardsByUser() {
		PhotocardListResponse response = photocardService.getPhotocards(userService.getUserEntity());
		return ResponseEntity.ok(response);
	}

	/** 포토카드의 메모 수정 */
	@PostMapping("/{photocard_id}")
	@ApiOperation(value="포토카드의 메모 수정하기", notes="memo에 string담아주고 pathvariable에 포토카드아이디 필요")
	public ResponseEntity<PhotocardResponse> updateMemo(@RequestBody PhotocardUpdateRequest photocardUpdateRequest, @PathVariable int photocard_id) {
		PhotocardResponse photocardResponse = photocardService.updatePhotocard(photocardUpdateRequest, photocard_id);
		return ResponseEntity.ok(photocardResponse);
	}

}
