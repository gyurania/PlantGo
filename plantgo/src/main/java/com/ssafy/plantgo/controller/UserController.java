package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.model.common.ApiResponse;
import com.ssafy.plantgo.model.entity.User;
import com.ssafy.plantgo.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ApiResponse getUser(@PathVariable String id) {

        User user = userService.getUser(id);

        return ApiResponse.success("user", user);
    }



}
