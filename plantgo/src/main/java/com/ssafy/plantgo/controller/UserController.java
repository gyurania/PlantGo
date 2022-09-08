package com.ssafy.plantgo.controller;

import com.ssafy.plantgo.exception.ResourceNotFoundException;
import com.ssafy.plantgo.model.User;
import com.ssafy.plantgo.repository.UserRepository;
import com.ssafy.plantgo.security.CurrentUser;
import com.ssafy.plantgo.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}