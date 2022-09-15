package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.PhotocardDto;
import com.ssafy.plantgo.model.dto.PhotocardRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PhotocardService {

	/** 포토카드 등록하기 */
	void registPhotocard(PhotocardRequest photocardRequest, MultipartFile img) throws IOException;
	String upload(MultipartFile multipartFile) throws IOException;

}
