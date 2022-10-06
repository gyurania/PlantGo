package com.ssafy.plantgo.model.service;

import com.ssafy.plantgo.model.dto.RankResponse;
import com.ssafy.plantgo.model.dto.UserResponseDto;
import com.ssafy.plantgo.model.entity.User;

public interface UserService {

    UserResponseDto getUser();
    User getUserEntity();

    /** Spark에서 처리한 랭킹 DB에서 반환 */
    RankResponse getRank();

}
