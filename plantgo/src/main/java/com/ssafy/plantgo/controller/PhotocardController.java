package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.model.dto.*;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.service.UserService;
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
	public ResponseEntity<PhotocardResponse> photocardRegist(@RequestPart PhotocardRequest photocardRequest, @RequestPart MultipartFile img) {
		try {
			String url = photocardService.upload(img);
			log.info("[Controller: photocardRegist] imgUrl : {}", url);
			PhotocardResponse photocardResponse = photocardService.registPhotocard(photocardRequest, img);
			return ResponseEntity.ok(photocardResponse);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(null);
	}

	/** area이름으로 포토카드 가져오기 */
	@PostMapping("/map")
	public ResponseEntity<MapResponse> getPhotocardsByArea(@RequestPart MapRequest mapRequest) {
		MapResponse response = photocardService.getPhotocardsByArea(mapRequest.getArea());
		if(response==null)
			return ResponseEntity.ok(null);
		return ResponseEntity.ok(response);
	}


	/** 해당 유저의 모든 포토카드 가져오기 */
	@GetMapping
	public ResponseEntity<PhotocardListResponse> getAllPhotocardsByUser() {
		org.springframework.security.core.userdetails.User principal =
				(org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.getUserEntity(principal.getUsername());
		PhotocardListResponse response = photocardService.getPhotocards(user);
		if(response==null)
			return ResponseEntity.ok(null);
		return ResponseEntity.ok(response);
	}

	/** 포토카드의 메모 수정 */
	@PostMapping("/{photocard_id}")
	public ResponseEntity<PhotocardResponse> updateMemo(@RequestBody PhotocardUpdateRequest photocardUpdateRequest, @PathVariable int photocard_id) {

		PhotocardResponse photocardResponse = photocardService.updatePhotocard(photocardUpdateRequest, photocard_id);
		return ResponseEntity.ok(photocardResponse);
	}

}
