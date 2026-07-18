package com.project.Fitness.repositery;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Fitness.model.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, String> {

    List<Activity> findByUserId(String userId);

}