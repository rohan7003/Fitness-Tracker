package com.project.Fitness.dto;

import java.time.LocalDateTime;
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
public class ActivityResponse {

    private String id;

    private ActivityType type;

    private Integer duration;

    private Integer caloriesBurned;

    private Map<String, Object> additionalMetrics;

    private LocalDateTime createdAt;
}