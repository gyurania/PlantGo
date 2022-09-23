package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.UserRankResponse;
import com.ssafy.plantgo.model.dto.UserResponseDto;
import com.ssafy.plantgo.model.entity.User;

public interface UserService {

    UserResponseDto getUser();
    User getUserEntity();

    UserRankResponse getRank();

}
