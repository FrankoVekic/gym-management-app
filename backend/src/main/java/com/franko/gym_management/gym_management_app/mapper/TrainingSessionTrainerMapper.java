package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionTrainerDto;
import com.franko.gym_management.gym_management_app.model.TrainingSessionTrainer;

public class TrainingSessionTrainerMapper {

    public static TrainingSessionTrainer mapToTrainingSessionTrainer(TrainingSessionTrainerDto trainingSessionTrainerDto){
        return new TrainingSessionTrainer(
                trainingSessionTrainerDto.getId(),
                trainingSessionTrainerDto.getTrainingSession(),
                trainingSessionTrainerDto.getTrainer()
        );
    }

    public static TrainingSessionTrainerDto mapToTrainingSessionTrainerDto(TrainingSessionTrainer trainingSessionTrainer){
        return new TrainingSessionTrainerDto(
                trainingSessionTrainer.getId(),
                trainingSessionTrainer.getTrainingSession(),
                trainingSessionTrainer.getTrainer()
        );
    }
}
