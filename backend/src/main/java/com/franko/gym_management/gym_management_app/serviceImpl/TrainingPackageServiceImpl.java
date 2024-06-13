package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TrainingPackageDto;
import com.franko.gym_management.gym_management_app.mapper.TrainingPackageMapper;
import com.franko.gym_management.gym_management_app.model.TrainingPackage;
import com.franko.gym_management.gym_management_app.repository.TrainingPackageRepository;
import com.franko.gym_management.gym_management_app.service.TrainingPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingPackageServiceImpl implements TrainingPackageService {

    @Autowired
    private TrainingPackageRepository trainingPackageRepository;

    @Override
    public List<TrainingPackageDto> getTrainingPackages() {
        List<TrainingPackage> list = trainingPackageRepository.findAllByOrderByIdAsc();
        return list
                .stream()
                .map(TrainingPackageMapper::mapToTrainingPackageDto)
                .collect(Collectors.toList());
    }

    @Override
    public TrainingPackageDto createTrainingPackage(TrainingPackageDto trainingPackageDto) {
        TrainingPackage trainingpackage = TrainingPackageMapper.mapToTrainingPackage(trainingPackageDto);
        TrainingPackage savedTrainingPackage = trainingPackageRepository.save(trainingpackage);
        return TrainingPackageMapper.mapToTrainingPackageDto(savedTrainingPackage);
    }
}
