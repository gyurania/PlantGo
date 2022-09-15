package com.ssafy.plantgo.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.plantgo.model.dto.PhotocardRequest;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.service.PhotocardService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.plantgo.model.dto.PhotocardDto;
import com.ssafy.plantgo.model.entity.PhotoCard;
import com.ssafy.plantgo.model.repository.PhotocardRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotocardServiceImpl implements PhotocardService {

	private final PhotocardRepository photocardRepository;
	private final ModelMapper modelMapper;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;

	/** 포토카드 등록하기 */
	@Override
	public void registPhotocard(PhotocardRequest photocardRequest, MultipartFile img) throws IOException {
		String photoUrl = upload(img);
		PhotoCard photocard = PhotoCard.builder()
				.latitude(photocardRequest.getLatitude())
				.longitude(photocardRequest.getLongitude())
				.user(User.builder().userSeq(photocardRequest.getUserSeq()).build())
				.photoUrl(photoUrl)
				.plantId(photocardRequest.getPlantId())
				.build();
		photocardRepository.save(photocard);
	}

	@Override
	public String upload(MultipartFile multipartFile) throws IOException {
		String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

		ObjectMetadata objMeta = new ObjectMetadata();
		objMeta.setContentLength(multipartFile.getInputStream().available());

		amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

		return amazonS3.getUrl(bucket, s3FileName).toString();
	}

}
