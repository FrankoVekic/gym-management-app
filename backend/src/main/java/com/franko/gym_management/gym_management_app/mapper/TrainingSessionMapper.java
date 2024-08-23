package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionDto;
import com.franko.gym_management.gym_management_app.dto.TrainingSessionUpdateDto;
import com.franko.gym_management.gym_management_app.model.TrainingSession;

public class TrainingSessionMapper {

    public static TrainingSessionDto mapToTrainingSessionDto(TrainingSession trainingSession) {
        return new TrainingSessionDto(
                trainingSession.getId(),
                trainingSession.getTrainingType(),
                trainingSession.getDate(),
                trainingSession.getTrainer(),
                trainingSession.getAttendances(),
                trainingSession.getDeletedAt()
        );
    }

    public static TrainingSession mapToTrainingSession(TrainingSessionDto trainingSessionDto) {
        return new TrainingSession(
                trainingSessionDto.getId(),
                trainingSessionDto.getTrainingType(),
                trainingSessionDto.getDate(),
                trainingSessionDto.getTrainer(),
                trainingSessionDto.getAttendances(),
                trainingSessionDto.getDeletedAt()
        );
    }

    public static TrainingSessionUpdateDto mapFromObjectToUpdatedDto(TrainingSession ts) {
        return new TrainingSessionUpdateDto(
                ts.getId(),
                ts.getTrainingType().getId(),
                ts.getDate(),
                ts.getTrainer().getId()
        );
    }


}
