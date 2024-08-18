package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TrainingTypeDto;
import com.franko.gym_management.gym_management_app.dto.TrainingTypeNamesDto;

import java.util.List;

public interface TrainingTypeService {
    List<TrainingTypeDto> getTrainingTypes();

    TrainingTypeDto createTrainingType(TrainingTypeDto trainingTypeDto);

    List<String> getAllTrainingTypeNames();

    List<TrainingTypeNamesDto> getTrainingTypeNamesAndIds();
}
