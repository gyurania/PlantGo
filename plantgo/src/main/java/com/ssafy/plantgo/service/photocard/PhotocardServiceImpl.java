package com.ssafy.plantgo.service.photocard;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.plantgo.dto.photocard.PhotocardDto;
import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.repository.PhotocardRepository;

@Service
public class PhotocardServiceImpl implements PhotocardService {

	@Autowired
	PhotocardRepository photocardRepository;

	ModelMapper modelMapper;

	/** 포토카드 등록하기 */
	@Override
	public void registPhotocard(PhotocardDto photocardDto) {
		PhotoCard photocard = modelMapper.map(photocardDto, PhotoCard.class);
		photocardRepository.save(photocard);
		
		return;
	}

}
