package com.project.Fitness.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Fitness.dto.UserResponse;
import com.project.Fitness.service.userService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final userService userService;

    @GetMapping("/profile/{userId}")
    public UserResponse getProfile(
            @PathVariable String userId) {

        return userService.getProfile(userId);
    }
}