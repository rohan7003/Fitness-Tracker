package com.project.Fitness.dto;

import java.util.Map;

import com.project.Fitness.model.ActivityType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {

    private String userId;

    private ActivityType type;

    private Integer duration;

    private Integer caloriesBurned;

    private Map<String, Object> additionalMetrics;
}