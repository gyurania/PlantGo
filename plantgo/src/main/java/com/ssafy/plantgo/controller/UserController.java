package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.model.common.ApiResponse;
import com.ssafy.plantgo.model.dto.PhotocardResponse;
import com.ssafy.plantgo.model.dto.RankResponse;
import com.ssafy.plantgo.model.dto.UserResponseDto;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @ApiOperation(value="유저 정보 가져오기", notes="딱히 넘겨줄 것 없음")
    public ApiResponse getUser() {
        UserResponseDto userdto = userService.getUser();
        return ApiResponse.success("user", userdto);
    }

    @GetMapping("/rank")
    @ApiOperation(value="랭킹 가져오기", notes="딱히 넘겨줄 것 없음")
    public ResponseEntity<RankResponse> getUserRank() {
        RankResponse rankResponse = userService.getRank();
        if(rankResponse==null)
            return ResponseEntity.ok(null);

        return ResponseEntity.ok(rankResponse);
    }


}
