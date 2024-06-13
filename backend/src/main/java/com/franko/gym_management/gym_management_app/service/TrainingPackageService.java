package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.TrainingPackageDto;

import java.util.List;

public interface TrainingPackageService {

    List<TrainingPackageDto> getTrainingPackages();

    TrainingPackageDto createTrainingPackage(TrainingPackageDto trainingPackageDto);
}
