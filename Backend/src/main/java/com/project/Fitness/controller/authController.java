package com.project.Fitness.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Fitness.dto.JwtResponse;
import com.project.Fitness.dto.LoginRequest;
import com.project.Fitness.dto.UserRegistrationRequest;
import com.project.Fitness.dto.UserResponse;
import com.project.Fitness.service.userService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class authController {

    private final userService us;

    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody UserRegistrationRequest request) {
        return us.register(request);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        return us.login(request);
    }
}