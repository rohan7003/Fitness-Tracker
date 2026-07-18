package com.project.Fitness.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Fitness.model.Recommendation;
import com.project.Fitness.service.RecommendationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recommendation")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping("/generate/{activityId}")
    public Recommendation generateRecommendation(
            @PathVariable String activityId) {

        return recommendationService.generateRecommendation(activityId);
    }

    @GetMapping("/user/{userId}")
    public List<Recommendation> getRecommendationsByUser(
            @PathVariable String userId) {

        return recommendationService.getRecommendationsByUser(userId);
    }

    @GetMapping("/activity/{activityId}")
    public List<Recommendation> getRecommendationsByActivity(
            @PathVariable String activityId) {

        return recommendationService.getRecommendationsByActivity(activityId);
    }
}