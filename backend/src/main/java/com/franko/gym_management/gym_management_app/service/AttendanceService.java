package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.AttendanceDto;

import java.util.List;

public interface AttendanceService {

    List<AttendanceDto> getAttendances();

    AttendanceDto createAttendance(AttendanceDto attendanceDto);

}
