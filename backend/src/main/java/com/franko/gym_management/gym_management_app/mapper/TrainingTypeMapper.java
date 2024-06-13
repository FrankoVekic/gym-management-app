package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TrainingTypeDto;
import com.franko.gym_management.gym_management_app.model.TrainingPackage;
import com.franko.gym_management.gym_management_app.model.TrainingType;

public class TrainingTypeMapper {

    public static TrainingTypeDto mapToTrainingTypeDto(TrainingType trainingType){
        return new TrainingTypeDto(
                trainingType.getId(),
                trainingType.getName(),
                trainingType.getDurationInMinutes(),
                trainingType.getDescription()
        );
    }

    public static TrainingType mapToTrainingType(TrainingTypeDto trainingTypeDto){
        return new TrainingType(
            trainingTypeDto.getId(),
            trainingTypeDto.getName(),
            trainingTypeDto.getDurationInMinutes(),
            trainingTypeDto.getDescription()
        );
    }
}
