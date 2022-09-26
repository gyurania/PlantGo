package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.UserResponseDto;

public interface UserService {

    UserResponseDto getUser(String id);
}
