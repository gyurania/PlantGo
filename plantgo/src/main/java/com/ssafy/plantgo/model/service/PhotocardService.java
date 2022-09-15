package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.PhotocardDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PhotocardService {

	/** 포토카드 등록하기 */
	void registPhotocard(PhotocardDto photocardDto, MultipartFile img);
	String upload(MultipartFile multipartFile) throws IOException;

}
