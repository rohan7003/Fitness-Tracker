package com.project.Fitness.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.Fitness.dto.ActivityRequest;
import com.project.Fitness.dto.ActivityResponse;
import com.project.Fitness.exception.ResourceNotFoundException;
import com.project.Fitness.model.Activity;
import com.project.Fitness.model.User;
import com.project.Fitness.repositery.ActivityRepository;
import com.project.Fitness.repositery.userRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final userRepo userRepository;

    public ActivityResponse createActivity(ActivityRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Activity activity = Activity.builder()
                .user(user)
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();

        Activity savedActivity = activityRepository.save(activity);

        return ActivityResponse.builder()
                .id(savedActivity.getId())
                .type(savedActivity.getType())
                .duration(savedActivity.getDuration())
                .caloriesBurned(savedActivity.getCaloriesBurned())
                .additionalMetrics(savedActivity.getAdditionalMetrics())
                .createdAt(savedActivity.getCreatedAt())
                .build();
    }

    public List<ActivityResponse> getActivitiesByUser(String userId) {

        return activityRepository.findByUserId(userId)
                .stream()
                .map(activity -> ActivityResponse.builder()
                        .id(activity.getId())
                        .type(activity.getType())
                        .duration(activity.getDuration())
                        .caloriesBurned(activity.getCaloriesBurned())
                        .additionalMetrics(activity.getAdditionalMetrics())
                        .createdAt(activity.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public void deleteActivity(String activityId) {

        if (!activityRepository.existsById(activityId)) {
            throw new ResourceNotFoundException("Activity not found");
        }

        activityRepository.deleteById(activityId);
    }
}