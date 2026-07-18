package com.project.Fitness.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Fitness.config.JwtService;
import com.project.Fitness.dto.JwtResponse;
import com.project.Fitness.dto.LoginRequest;
import com.project.Fitness.dto.UserRegistrationRequest;
import com.project.Fitness.dto.UserResponse;
import com.project.Fitness.exception.ResourceNotFoundException;
import com.project.Fitness.model.Role;
import com.project.Fitness.model.User;
import com.project.Fitness.repositery.userRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class userService {

    private final userRepo us;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserResponse register(UserRegistrationRequest request) {

        if (us.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.USER)
                .build();

        User savedUser = us.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    public JwtResponse login(LoginRequest request) {

        Optional<User> optionalUser = us.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return JwtResponse.builder()
                .token(token)
                .user(
                        UserResponse.builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .createdAt(user.getCreatedAt())
                                .build()
                )
                .build();
    }

    public UserResponse getProfile(String userId) {

        User user = us.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .createdAt(user.getCreatedAt())
                .build();
    }
}