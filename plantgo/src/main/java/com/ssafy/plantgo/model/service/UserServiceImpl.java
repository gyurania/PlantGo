package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.UserRankResponse;
import com.ssafy.plantgo.model.dto.UserResponseDto;
import com.ssafy.plantgo.model.entity.Rank;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.repository.RankRepository;
import com.ssafy.plantgo.model.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public UserResponseDto getUser(String id) {
        User user = userRepository.findByUserId(id);
        UserResponseDto userresponse = modelMapper.map(user, UserResponseDto.class);
        return userresponse;
    }

    @Override
    public User getUserEntity(String id) {
        User user = userRepository.findByUserId(id);
        return user;
    }

    @Override
    public UserRankResponse getRank() {
        List<Rank> rankList = rankRepository.findAll();
        UserRankResponse rankresponse = new UserRankResponse(Optional.ofNullable(rankList));
        return rankresponse;
    }
}
