package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.model.common.ApiResponse;
import com.ssafy.plantgo.model.dto.UserResponseDto;
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

    @GetMapping
    public ApiResponse getUser() {
        System.out.println("hello");
        System.out.println("SecurityContextHolder.getContext().getAuthentication().getPrincipal() = " + SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("principal.getUsername() = " + principal.getUsername());
        System.out.println("principal.getUsername() = " + principal.getPassword());
        UserResponseDto userdto = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", userdto);
    }


}
