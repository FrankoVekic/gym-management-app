package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.StatusDto;
import com.franko.gym_management.gym_management_app.model.Status;
import java.util.List;
import java.util.stream.Collectors;

public class StatusMapper {

    public static Status mapToStatus(StatusDto statusDto) {

        return new Status(
            statusDto.getId(),
            statusDto.getStatusType()
        );
    }

    public static StatusDto mapToStatusDto(Status status) {

        return new StatusDto(
            status.getId(),
            status.getStatusType()
        );
    }

    public static List<StatusDto> mapToStatusDtoList(List<Status> statuses) {
        return statuses.stream()
                .map(StatusMapper::mapToStatusDto)
                .collect(Collectors.toList());
    }

}
