package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionTrainerDto;
import com.franko.gym_management.gym_management_app.mapper.TrainingSessionTrainerMapper;
import com.franko.gym_management.gym_management_app.model.TrainingSessionTrainer;
import com.franko.gym_management.gym_management_app.repository.TrainingSessionTrainerRepository;
import com.franko.gym_management.gym_management_app.service.TrainingSessionTrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingSessionTrainerServiceImpl implements TrainingSessionTrainerService {

    @Autowired
    private TrainingSessionTrainerRepository trainingSessionTrainerRepository;

    @Override
    public List<TrainingSessionTrainerDto> getAll() {
        List<TrainingSessionTrainer> list = trainingSessionTrainerRepository.findAllByOrderByIdAsc();
        return list.stream()
                .map(TrainingSessionTrainerMapper::mapToTrainingSessionTrainerDto)
               .collect(Collectors.toList());
    }

    @Override
    public TrainingSessionTrainerDto createTrainingSessionTrainer(TrainingSessionTrainerDto trainingSessionTrainerDto) {
        TrainingSessionTrainer trainingSessionTrainer = TrainingSessionTrainerMapper.mapToTrainingSessionTrainer(trainingSessionTrainerDto);
        TrainingSessionTrainer savedTrainingSessionTrainer = trainingSessionTrainerRepository.save(trainingSessionTrainer);
        return TrainingSessionTrainerMapper.mapToTrainingSessionTrainerDto(savedTrainingSessionTrainer);
    }
}
