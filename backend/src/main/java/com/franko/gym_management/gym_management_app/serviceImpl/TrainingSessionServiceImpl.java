package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionDto;
import com.franko.gym_management.gym_management_app.mapper.TrainingSessionMapper;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import com.franko.gym_management.gym_management_app.repository.TrainingSessionRepository;
import com.franko.gym_management.gym_management_app.service.TrainingSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingSessionServiceImpl implements TrainingSessionService {

    @Autowired
    private TrainingSessionRepository trainingSessionRepository;
    @Override
    public List<TrainingSessionDto> getTrainingSessions() {
        List<TrainingSession> trainingSessions = trainingSessionRepository.findAllByOrderByIdAsc();
        return trainingSessions
                .stream()
                .map(TrainingSessionMapper::mapToTrainingSessionDto)
                .collect(Collectors.toList());
    }

    @Override
    public TrainingSessionDto createTrainingSession(TrainingSessionDto trainingSessionDto) {
        TrainingSession trainingSession = TrainingSessionMapper.mapToTrainingSession(trainingSessionDto);
        return TrainingSessionMapper.mapToTrainingSessionDto(trainingSessionRepository.save(trainingSession));
    }
}
