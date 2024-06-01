package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.AttendanceDto;
import com.franko.gym_management.gym_management_app.mapper.AttendanceMapper;
import com.franko.gym_management.gym_management_app.model.Attendance;
import com.franko.gym_management.gym_management_app.repository.AttendanceRepository;
import com.franko.gym_management.gym_management_app.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public List<AttendanceDto> getAttendances() {
        List<Attendance> list = attendanceRepository.findAllByOrderByIdAsc();
        return list.stream()
                .map(AttendanceMapper::mapToAttendanceDto)
               .collect(Collectors.toList());

    }

    @Override
    public AttendanceDto createAttendance(AttendanceDto attendanceDto) {
        Attendance attendance = AttendanceMapper.mapToAttendance(attendanceDto);
        Attendance savedAttendance = attendanceRepository.save(attendance);
        return AttendanceMapper.mapToAttendanceDto(savedAttendance);
    }
}
