package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.StatusDto;
import com.franko.gym_management.gym_management_app.mapper.StatusMapper;
import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.repository.StatusRepository;
import com.franko.gym_management.gym_management_app.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<StatusDto> getStatuses() {
        List<Status> status = statusRepository.findAllByOrderByIdAsc();
        return status
                .stream()
                .map(StatusMapper::mapToStatusDto)
                .collect(Collectors.toList());
    }

    @Override
    public StatusDto createStatus(StatusDto statusDto) {
        Status createdStatus = StatusMapper.mapToStatus(statusDto);
        Status savedStatus = statusRepository.save(createdStatus);
        return StatusMapper.mapToStatusDto(savedStatus);
    }

    @Override
    public void deleteStatus(Long id) {
        Status status = statusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Status with ID: " + id + " doesn't exist."));
        statusRepository.delete(status);
    }

    @Override
    public StatusDto updateStatus(Long id, StatusDto statusDto) {

        Status existingStatus = statusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Status not found"));

        existingStatus.setStatusType(statusDto.getStatusType());

        Status updatedStatus = statusRepository.save(existingStatus);

        return StatusMapper.mapToStatusDto(updatedStatus);
    }

    @Override
    public List<StatusDto> addMultipleStatuses(List<StatusDto> statusDtoList) {
        List<Status> statuses =
                statusDtoList
                        .stream()
                        .map(StatusMapper::mapToStatus)
                        .collect(Collectors.toList());
        List<Status> savedList = statusRepository.saveAll(statuses);

        return StatusMapper.mapToStatusDtoList(savedList);
    }
}
