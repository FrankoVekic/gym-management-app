package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TrainingTypeDto;
import com.franko.gym_management.gym_management_app.model.TrainingPackage;

public class TrainingTypeMapper {

    public static TrainingTypeDto mapToTrainingTypeDto(TrainingPackage trainingPackage){
        return new TrainingTypeDto(
            trainingPackage.getId(),
            trainingPackage.getName(),
            trainingPackage.getPrice(),
            trainingPackage.getFeatures()
        );
    }

    public static TrainingPackage mapToTrainingType(TrainingTypeDto trainingTypeDto){
        return new TrainingPackage(
            trainingTypeDto.getId(),
            trainingTypeDto.getName(),
            trainingTypeDto.getPrice(),
            trainingTypeDto.getFeatures()
        );
    }
}
