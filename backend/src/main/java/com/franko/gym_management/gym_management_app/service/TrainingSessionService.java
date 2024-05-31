package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionDto;

import java.util.List;

public interface TrainingSessionService {

    List<TrainingSessionDto> getTrainingSessions();

    TrainingSessionDto createTrainingSession(TrainingSessionDto trainingSessionDto);
}
