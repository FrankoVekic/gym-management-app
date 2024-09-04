package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TrainerDto;
import com.franko.gym_management.gym_management_app.dto.TrainerNameDto;
import com.franko.gym_management.gym_management_app.dto.TrainerProfileDto;

import java.util.List;

public interface TrainerService {

    List<TrainerDto> getTrainers();

    TrainerDto createTrainer(TrainerDto trainerDto);

    List<TrainerNameDto> getTrainerNames();

    TrainerProfileDto getTrainerProfile(Long id);

}
