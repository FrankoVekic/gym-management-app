package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TrainerDto;
import com.franko.gym_management.gym_management_app.model.Trainer;

public class TrainerMapper {

    public static TrainerDto mapToTrainerDto(Trainer trainer){

        return new TrainerDto(
                trainer.getId(),
                trainer.getDescription(),
                trainer.getUser(),
                trainer.getStatus(),
                trainer.getTrainingSessions()
        );
    }

    public static Trainer mapToTrainer(TrainerDto trainerDto){
        return new Trainer(
                trainerDto.getId(),
                trainerDto.getDescription(),
                trainerDto.getUser(),
                trainerDto.getStatus(),
                trainerDto.getTrainingSessions()
        );
    }
}
