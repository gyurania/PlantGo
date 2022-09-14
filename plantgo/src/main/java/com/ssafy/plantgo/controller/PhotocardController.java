package com.ssafy.plantgo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.plantgo.dto.photocard.PhotocardDto;
import com.ssafy.plantgo.service.photocard.PhotocardService;

@RestController
@RequestMapping("/photocard")
public class PhotocardController {

	@Autowired
	PhotocardService photocardService;

	/** 포토카드 등록하기 */
	@PostMapping
	public ResponseEntity<?> photocardRegist(@RequestPart PhotocardDto photocardDto) {
		photocardService.registPhotocard(photocardDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
