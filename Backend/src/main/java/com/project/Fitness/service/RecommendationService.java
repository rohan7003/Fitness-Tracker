package com.project.Fitness.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.Fitness.exception.ResourceNotFoundException;
import com.project.Fitness.model.Activity;
import com.project.Fitness.model.ActivityType;
import com.project.Fitness.model.Recommendation;
import com.project.Fitness.repositery.ActivityRepository;
import com.project.Fitness.repositery.RecommendationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final ActivityRepository activityRepository;

    public Recommendation generateRecommendation(String activityId) {

        Optional<Recommendation> existingRecommendation =
                recommendationRepository.findFirstByActivityId(activityId);

        if (existingRecommendation.isPresent()) {
            return existingRecommendation.get();
        }

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Activity not found"));

        Recommendation recommendation = Recommendation.builder()
                .activity(activity)
                .user(activity.getUser())
                .type(activity.getType().name())
                .recommendation(generateMessage(activity.getType()))
                .improvements(generateImprovements(activity.getType()))
                .suggestions(generateSuggestions(activity.getType()))
                .safety(generateSafety(activity.getType()))
                .build();

        return recommendationRepository.save(recommendation);
    }

    public List<Recommendation> getRecommendationsByUser(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public List<Recommendation> getRecommendationsByActivity(String activityId) {
        return recommendationRepository.findByActivityId(activityId);
    }

    private String generateMessage(ActivityType type) {

        switch (type) {

            case RUNNING:
                return "Focus on hydration and increase distance gradually.";

            case CYCLING:
                return "Maintain consistent cadence and improve endurance.";

            case YOGA:
                return "Practice regularly and focus on breathing.";

            case SWIMMING:
                return "Improve stroke technique and breathing control.";

            default:
                return "Maintain consistency and track progress.";
        }
    }

    private List<String> generateImprovements(ActivityType type) {

        List<String> improvements = new ArrayList<>();

        improvements.add("Increase workout consistency");
        improvements.add("Track performance weekly");

        return improvements;
    }

    private List<String> generateSuggestions(ActivityType type) {

        List<String> suggestions = new ArrayList<>();

        suggestions.add("Stay hydrated");
        suggestions.add("Maintain a balanced diet");

        return suggestions;
    }

    private List<String> generateSafety(ActivityType type) {

        List<String> safety = new ArrayList<>();

        safety.add("Warm up before exercise");
        safety.add("Cool down after exercise");

        return safety;
    }
}