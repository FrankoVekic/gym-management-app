package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TrainingTypeDto;

import java.util.List;

public interface TrainingTypeService {
    List<TrainingTypeDto> getTrainingTypes();

    TrainingTypeDto createTrainingType(TrainingTypeDto trainingTypeDto);
}
