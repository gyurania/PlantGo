package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.*;
import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface PhotocardService {

	/** 포토카드 등록하기 */
	PhotocardResponse registPhotocard(PhotocardRequest photocardRequest, MultipartFile img) throws IOException;
	String upload(MultipartFile multipartFile) throws IOException;

	PhotocardResponse updatePhotocard(PhotocardUpdateRequest photocardUpdateRequest, int photocard_id);
	PhotocardListResponse getPhotocards(User user);
	MapResponse getPhotocardsByArea(AreaRequest areaRequest);

}
