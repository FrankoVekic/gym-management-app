package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.AttendanceDto;
import com.franko.gym_management.gym_management_app.dto.CheckAttendanceDto;

import java.util.List;

public interface AttendanceService {

    List<AttendanceDto> getAttendances();

    AttendanceDto createAttendance(AttendanceDto attendanceDto);

    Long checkAttendance(CheckAttendanceDto checkAttendanceDto);

    // TODO: CHANGE RESPONSE MODEL, ITS GIVING AWAY PROTECTED DATA RIGHT NOW
    AttendanceDto registerForTraining(Long userId, Long trainingSessionId);

}
