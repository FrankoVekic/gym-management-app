package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.StatusDto;

import java.util.List;

public interface StatusService {

    List<StatusDto> getStatuses();
    StatusDto createStatus(StatusDto statusDto);
    void deleteStatus(Long id);
}
