package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.AttendanceDto;
import com.franko.gym_management.gym_management_app.model.Attendance;

public class AttendanceMapper {

    public static AttendanceDto mapToAttendanceDto(Attendance attendance){
        return new AttendanceDto(
            attendance.getId(),
            attendance.getTrainingSession(),
            attendance.getMember(),
            attendance.getUnattendedAt()
        );
    }

    public static Attendance mapToAttendance(AttendanceDto attendanceDto){
        return new Attendance(
            attendanceDto.getId(),
            attendanceDto.getTrainingSession(),
            attendanceDto.getMember(),
            attendanceDto.getUnattendedAt()
        );
    }
}
