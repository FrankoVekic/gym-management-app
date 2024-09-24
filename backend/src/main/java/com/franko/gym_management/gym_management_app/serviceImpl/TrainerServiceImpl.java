package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.exceptions.ResourceNotFoundException;
import com.franko.gym_management.gym_management_app.mapper.TrainerMapper;
import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.Trainer;
import com.franko.gym_management.gym_management_app.repository.StatusRepository;
import com.franko.gym_management.gym_management_app.repository.TrainerRepository;
import com.franko.gym_management.gym_management_app.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private StatusRepository statusRepository;

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

    @Override
    public List<TrainerNameDto> getTrainerNames() {

        List<Object[]> results = trainerRepository.getTrainerFirstnamesAndLastNames();
        List<TrainerNameDto> trainers = new ArrayList<>();

        for (Object[] result : results) {
            TrainerNameDto dto = new TrainerNameDto();
            dto.setId((Long) result[0]);
            dto.setFirstname((String) result[1]);
            dto.setLastname((String) result[2]);

            trainers.add(dto);
        }

        return trainers;
    }

    @Override
    public TrainerProfileDto getTrainerProfile(Long id) {

        List<Object[]> result = trainerRepository.getTrainerProfileDetails(id);

        if (result.isEmpty()) {
            throw new ResourceNotFoundException("No trainer found with ID: " + id);
        }

        Object[] userData = result.get(0);

        return TrainerProfileDto.builder()
                .firstName((String) userData[0])
                .lastName((String) userData[1])
                .email((String) userData[2])
                .image((String) userData[3])
                .role((String) userData[4])
                .status((String) userData[5])
                .description((String) userData[6])
                .id((Long) userData[7])
                .build();
    }

    @Override
    public void updateTrainerStatus(UpdateTrainerStatusDto updateTrainerStatusDto) {

        Trainer trainer = trainerRepository.findById(updateTrainerStatusDto.getTrainerId()).orElseThrow(() -> new RuntimeException("Trainer with given ID does not exist"));
        Status status;
        try{
            status = statusRepository.findByStatusType(updateTrainerStatusDto.getStatus());
            if(status.getId() < 6){
                throw new RuntimeException("Status that you are trying to set for trainer is for Members!");
            }

        }catch (Exception e){
            throw new RuntimeException("Status with given Name is not found");
        }

        trainer.setStatus(status);
        trainerRepository.save(trainer);

    }

    @Override
    public void softRemoveById(Long id) {

        trainerRepository.findById(id).orElseThrow(() -> new RuntimeException("Trainer with given ID does not exist"));
        trainerRepository.softDeleteById(id);

    }

}
