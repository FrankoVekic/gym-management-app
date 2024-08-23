package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.mapper.TrainerMapper;
import com.franko.gym_management.gym_management_app.mapper.TrainingSessionMapper;
import com.franko.gym_management.gym_management_app.model.Blog;
import com.franko.gym_management.gym_management_app.model.Trainer;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import com.franko.gym_management.gym_management_app.model.TrainingType;
import com.franko.gym_management.gym_management_app.repository.TrainerRepository;
import com.franko.gym_management.gym_management_app.repository.TrainingSessionRepository;
import com.franko.gym_management.gym_management_app.repository.TrainingTypeRepository;
import com.franko.gym_management.gym_management_app.service.TrainingSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingSessionServiceImpl implements TrainingSessionService {

    @Autowired
    private TrainingSessionRepository trainingSessionRepository;

    @Autowired
    private TrainingTypeRepository trainingTypeRepository;

    @Autowired
    private TrainerRepository trainerRepository;

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

        if (trainingSessionDto.getDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Date must be in the future.");
        }

        return TrainingSessionMapper.mapToTrainingSessionDto(trainingSessionRepository.save(trainingSession));
    }

    @Override
    public long getTotalTrainingSessionsCount() {
        return trainingSessionRepository.count();
    }

    @Override
    public List<TrainingSessionResponseDto> getUpcomingTrainingSessions() {
        List<Object[]> results = trainingSessionRepository.findUpcomingTrainingSessions();
        List<TrainingSessionResponseDto> sessions = new ArrayList<>();

        for (Object[] result : results) {
            TrainingSessionResponseDto dto = new TrainingSessionResponseDto();
            dto.setSessionId(((Number) result[0]).longValue());
            dto.setTrainingType((String) result[1]);

            Timestamp timestamp = (Timestamp) result[2];
            LocalDateTime localDateTime = timestamp.toLocalDateTime();
            dto.setSessionDate(localDateTime);

            dto.setNumberOfPeople(((Number) result[3]).longValue());


            String[] trainersArray = (String[]) result[4];
            List<String> trainersList = Arrays.asList(trainersArray);
            dto.setTrainer(trainersList);

            dto.setDuration(((Number) result[5]).intValue());
            dto.setDescription((String) result[6]);

            sessions.add(dto);
        }

        return sessions;
    }

    @Override
    public List<UserTrainingSessionsDto> getUpcomingUserTrainingSessions(Long id) {
        List<Object[]> results = trainingSessionRepository.findUpcomingTrainingSessionsByUser(id);
        List<UserTrainingSessionsDto> sessions = new ArrayList<>();

        for (Object[] result : results) {
            UserTrainingSessionsDto dto = new UserTrainingSessionsDto();
            dto.setSessionId(((Number) result[0]).longValue());
            dto.setTrainingType((String) result[1]);

            Timestamp timestamp = (Timestamp) result[2];
            LocalDateTime localDateTime = timestamp.toLocalDateTime();
            dto.setSessionDate(localDateTime);


            String[] trainersArray = (String[]) result[3];
            List<String> trainersList = Arrays.asList(trainersArray);
            dto.setTrainer(trainersList);

            dto.setDuration(((Number) result[4]).intValue());
            dto.setDescription((String) result[5]);

            sessions.add(dto);
        }

        return sessions;
    }

    @Override
    public void softDeleteById(Long id) {

        TrainingSession trainingSession = trainingSessionRepository.findById(id).orElseThrow(() -> new RuntimeException("Training session not found"));
        trainingSessionRepository.softDeleteById(id);
    }

    @Override
    public TrainingSessionUpdateDto updateTrainingSession(TrainingSessionUpdateDto trainingSessionUpdateDto) {

        TrainingSession ts = trainingSessionRepository
                .findById(trainingSessionUpdateDto.getId())
                .orElseThrow(
                        () -> new RuntimeException("Training Session with given id does not exist"));

        TrainingType trainingType = trainingTypeRepository
                .findById(trainingSessionUpdateDto
                        .getTrainingType()).orElseThrow(
                        () -> new RuntimeException("Training type with given id does not exist"));

        Trainer trainer = trainerRepository
                .findById(trainingSessionUpdateDto.getTrainer())
                .orElseThrow(
                        () -> new RuntimeException("Trainer with given id does not exist"));

        ts.setTrainingType(trainingType);
        ts.setDate(trainingSessionUpdateDto.getDate());
        ts.setTrainer(trainer);

        TrainingSession savedTs = trainingSessionRepository.save(ts);

        return TrainingSessionMapper.mapFromObjectToUpdatedDto(ts);


    }

    @Override
    public SpecTrainingSessionDto getTrainingSessionById(Long id) {
        TrainingSession trainingSession = trainingSessionRepository.findById(id).orElseThrow(() -> new RuntimeException("Training session not found"));
        return new SpecTrainingSessionDto(
                trainingSession.getId(),
                trainingSession.getTrainingType(),
                trainingSession.getDate(),
                TrainerMapper.mapToTrainerName(trainingSession.getTrainer())
        );
    }
}
