package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TrainingTypeDto;
import com.franko.gym_management.gym_management_app.mapper.TrainingTypeMapper;
import com.franko.gym_management.gym_management_app.model.TrainingType;
import com.franko.gym_management.gym_management_app.repository.TrainingTypeRepository;
import com.franko.gym_management.gym_management_app.service.TrainingTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingTypeServiceImpl implements TrainingTypeService {

    @Autowired
    private TrainingTypeRepository trainingTypeRepository;

    @Override
    public List<TrainingTypeDto> getTrainingTypes() {
        List<TrainingType> trainingTypes
                = trainingTypeRepository.findAllByOrderByIdAsc();

        return trainingTypes
                .stream()
                .map(TrainingTypeMapper::mapToTrainingTypeDto)
                .collect(Collectors.toList());
    }

    @Override
    public TrainingTypeDto createTrainingType(TrainingTypeDto trainingTypeDto) {
        TrainingType trainingType = TrainingTypeMapper.mapToTrainingType(trainingTypeDto);
        return TrainingTypeMapper.mapToTrainingTypeDto(trainingTypeRepository.save(trainingType));
    }

    @Override
    public List<String> getAllTrainingTypeNames() {
        return trainingTypeRepository.findAll()
                .stream()
                .map(TrainingType::getName)
                .collect(Collectors.toList());
    }


}
