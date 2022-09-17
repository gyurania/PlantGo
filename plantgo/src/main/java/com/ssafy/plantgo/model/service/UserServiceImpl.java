package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.UserResponseDto;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
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
}
