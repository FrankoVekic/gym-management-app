package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TrainerDto;
import com.franko.gym_management.gym_management_app.model.Trainer;

public class TrainerMapper {

    public static TrainerDto mapToTrainerDto(Trainer trainer){

        return new TrainerDto(
                trainer.getId(),
                trainer.getUser(),
                trainer.getStatus()
        );
    }

    public static Trainer mapToTrainer(TrainerDto trainerDto){
        return new Trainer(
                trainerDto.getId(),
                trainerDto.getUser(),
                trainerDto.getStatus()
        );
    }
}
