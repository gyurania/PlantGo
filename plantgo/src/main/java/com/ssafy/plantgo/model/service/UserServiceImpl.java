package com.ssafy.plantgo.model.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ssafy.plantgo.model.dto.RankResponse;
import com.ssafy.plantgo.model.dto.RankResponseDto;
import com.ssafy.plantgo.model.dto.UserResponseDto;
import com.ssafy.plantgo.model.entity.Rank;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.repository.RankRepository;
import com.ssafy.plantgo.model.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	private final RankRepository rankRepository;
	private final ModelMapper modelMapper;

	public UserServiceImpl(UserRepository userRepository, RankRepository rankRepository, ModelMapper modelMapper) {
		this.userRepository = userRepository;
		this.rankRepository = rankRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public UserResponseDto getUser() {
		org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUserId(principal.getUsername());
		UserResponseDto userresponse = modelMapper.map(user, UserResponseDto.class);
		return userresponse;
	}

	@Override
	public User getUserEntity() {
		org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUserId(principal.getUsername());
		return user;
	}

	/** Spark에서 처리한 랭킹 DB에서 반환 */
	@Override
	public RankResponse getRank() {
		long count = rankRepository.countAll();
		List<Rank> rankList = rankRepository.findAll(count - 30);
		List<RankResponseDto> rankResponseList = new LinkedList<>();

		for (Rank rank : rankList) {
			Long userSeq = rank.getUserSeq();
			String userName = userRepository.findByUserSeq(userSeq).getUsername();

			RankResponseDto rankDto = new RankResponseDto(userSeq, rank.getPlantsCollects(), rank.getInsertTime(),
					userName);

			rankResponseList.add(rankDto);
		}

		RankResponse rankresponse = new RankResponse(Optional.ofNullable(rankResponseList));
		return rankresponse;
	}

}
