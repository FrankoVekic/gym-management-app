package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionDto;
import com.franko.gym_management.gym_management_app.dto.TrainingSessionResponseDto;
import com.franko.gym_management.gym_management_app.dto.UserTrainingSessionRequest;
import com.franko.gym_management.gym_management_app.dto.UserTrainingSessionsDto;
import com.franko.gym_management.gym_management_app.mapper.TrainingSessionMapper;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import com.franko.gym_management.gym_management_app.repository.TrainingSessionRepository;
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
}
