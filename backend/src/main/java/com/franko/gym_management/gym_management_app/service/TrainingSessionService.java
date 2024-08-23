package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.*;

import java.util.List;

public interface TrainingSessionService {

    List<TrainingSessionDto> getTrainingSessions();

    TrainingSessionDto createTrainingSession(TrainingSessionDto trainingSessionDto);

    long getTotalTrainingSessionsCount();

    List<TrainingSessionResponseDto> getUpcomingTrainingSessions();

    List<UserTrainingSessionsDto> getUpcomingUserTrainingSessions(Long id);

    void softDeleteById(Long id);

    TrainingSessionUpdateDto updateTrainingSession(TrainingSessionUpdateDto trainingSessionUpdateDto);

    SpecTrainingSessionDto getTrainingSessionById(Long id);


}
