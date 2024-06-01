package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionTrainerDto;

import java.util.List;

public interface TrainingSessionTrainerService {

    List<TrainingSessionTrainerDto> getAll();

    TrainingSessionTrainerDto createTrainingSessionTrainer(TrainingSessionTrainerDto trainingSessionTrainerDto);
}
