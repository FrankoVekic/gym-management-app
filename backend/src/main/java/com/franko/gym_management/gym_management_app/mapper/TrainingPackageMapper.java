package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TrainingPackageDto;
import com.franko.gym_management.gym_management_app.model.TrainingPackage;

public class TrainingPackageMapper {

    public static TrainingPackage mapToTrainingPackage(TrainingPackageDto trainingPackageDto) {
        return new TrainingPackage(
                trainingPackageDto.getId(),
                trainingPackageDto.getName(),
                trainingPackageDto.getPrice(),
                trainingPackageDto.getFeatures()
        );
    }

    public static TrainingPackageDto mapToTrainingPackageDto(TrainingPackage trainingPackage) {
        return new TrainingPackageDto(
                trainingPackage.getId(),
                trainingPackage.getName(),
                trainingPackage.getPrice(),
                trainingPackage.getFeatures()
        );
    }
}
