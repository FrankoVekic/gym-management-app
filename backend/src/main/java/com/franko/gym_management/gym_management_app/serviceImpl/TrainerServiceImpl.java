package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TrainerDto;
import com.franko.gym_management.gym_management_app.mapper.TrainerMapper;
import com.franko.gym_management.gym_management_app.model.Trainer;
import com.franko.gym_management.gym_management_app.repository.TrainerRepository;
import com.franko.gym_management.gym_management_app.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public List<TrainerDto> getTrainers() {
        List<Trainer> trainers = trainerRepository.findAllByOrderByIdAsc();
        return trainers
                .stream()
                .map(TrainerMapper::mapToTrainerDto)
                .collect(Collectors.toList());

    }

    @Override
    public TrainerDto createTrainer(TrainerDto trainerDto) {
        Trainer trainer = TrainerMapper.mapToTrainer(trainerDto);
        return TrainerMapper.mapToTrainerDto(trainerRepository.save(trainer));
    }
}
