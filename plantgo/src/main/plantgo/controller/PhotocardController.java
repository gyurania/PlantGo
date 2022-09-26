package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.model.dto.PhotocardRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.plantgo.model.dto.PhotocardDto;
import com.ssafy.plantgo.model.service.PhotocardService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/photocard")
public class PhotocardController {

	private final PhotocardService photocardService;

	/** 포토카드 등록하기 */
	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> photocardRegist(@RequestPart PhotocardRequest photocardRequest, @RequestPart MultipartFile img) {
		try {
			String url = photocardService.upload(img);
			log.info("[Controller: photocardRegist] imgUrl : {}", url);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
