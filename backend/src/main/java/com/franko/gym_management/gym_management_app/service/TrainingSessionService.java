package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionDto;
import com.franko.gym_management.gym_management_app.dto.TrainingSessionResponseDto;
import com.franko.gym_management.gym_management_app.dto.UserTrainingSessionRequest;
import com.franko.gym_management.gym_management_app.dto.UserTrainingSessionsDto;

import java.util.List;

public interface TrainingSessionService {

    List<TrainingSessionDto> getTrainingSessions();

    TrainingSessionDto createTrainingSession(TrainingSessionDto trainingSessionDto);

    long getTotalTrainingSessionsCount();

    List<TrainingSessionResponseDto> getUpcomingTrainingSessions();

    List<UserTrainingSessionsDto> getUpcomingUserTrainingSessions(Long id);

    void softDeleteById(Long id);
}
