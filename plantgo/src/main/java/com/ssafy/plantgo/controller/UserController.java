package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.model.common.ApiResponse;
import com.ssafy.plantgo.model.dto.PhotocardResponse;
import com.ssafy.plantgo.model.dto.RankResponse;
import com.ssafy.plantgo.model.dto.UserResponseDto;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse getUser() {
        UserResponseDto userdto = userService.getUser();
        return ApiResponse.success("user", userdto);
    }

    @GetMapping("/rank")
    public ResponseEntity<RankResponse> getUserRank() {
        RankResponse rankResponse = userService.getRank();
        if(rankResponse==null)
            return ResponseEntity.ok(null);

        return ResponseEntity.ok(rankResponse);
    }


}
