package com.project.Fitness.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Fitness.dto.ActivityRequest;
import com.project.Fitness.dto.ActivityResponse;
import com.project.Fitness.service.ActivityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ActivityResponse createActivity(
            @RequestBody ActivityRequest request) {

        return activityService.createActivity(request);
    }

    @GetMapping("/user/{userId}")
    public List<ActivityResponse> getActivitiesByUser(
            @PathVariable String userId) {

        return activityService.getActivitiesByUser(userId);
    }

    @DeleteMapping("/{activityId}")
    public String deleteActivity(
            @PathVariable String activityId) {

        activityService.deleteActivity(activityId);

        return "Activity deleted successfully";
    }
}