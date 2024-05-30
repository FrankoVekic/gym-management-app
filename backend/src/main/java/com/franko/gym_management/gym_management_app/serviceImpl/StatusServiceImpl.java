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
}
