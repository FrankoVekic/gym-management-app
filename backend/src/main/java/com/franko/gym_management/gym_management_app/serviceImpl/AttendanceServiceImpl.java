package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.AttendanceDto;
import com.franko.gym_management.gym_management_app.dto.CheckAttendanceDto;
import com.franko.gym_management.gym_management_app.mapper.AttendanceMapper;
import com.franko.gym_management.gym_management_app.model.Attendance;
import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.model.TrainingSession;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.AttendanceRepository;
import com.franko.gym_management.gym_management_app.repository.MemberRepository;
import com.franko.gym_management.gym_management_app.repository.TrainingSessionRepository;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import com.franko.gym_management.gym_management_app.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainingSessionRepository trainingSessionRepository;

    @Autowired
    private MemberRepository memberRepository;

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

    @Override
    public Long checkAttendance(CheckAttendanceDto checkAttendanceDto) {
        return attendanceRepository.checkAttendance(checkAttendanceDto.getUserId(), checkAttendanceDto.getTrainingSessionId());
    }

    @Override
    public AttendanceDto registerForTraining(Long userId, Long trainingSessionId) {

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Member does not exist"));

        TrainingSession trainingSession = trainingSessionRepository.findById(trainingSessionId)
                .orElseThrow(() -> new RuntimeException("Training session does not exist"));

        Attendance attendance = attendanceRepository.findByMemberIdAndTrainingSessionIdAndUnattendedAtIsNotNull(member.getId(), trainingSessionId);

        if (attendance != null) {
            if (attendance.getUnattendedAt() != null) {
                attendance.setUnattendedAt(null);
                attendanceRepository.save(attendance);
            } else {
                throw new IllegalArgumentException("Member is already registered in this training session");
            }
        } else {
            attendance = Attendance.builder()
                    .member(member)
                    .trainingSession(trainingSession)
                    .build();

            attendanceRepository.save(attendance);
        }

        return AttendanceMapper.mapToAttendanceDto(attendance);

    }

    @Override
    public void unregisterFromTraining(Long userId, Long trainingSessionId) {

        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Member does not exist"));

        Attendance attendance = attendanceRepository.findByMemberIdAndTrainingSessionIdAndUnattendedAtIsNull(member.getId(), trainingSessionId);

        if (attendance == null) {
            throw new IllegalArgumentException("Attendance not found for user and training session");
        }

        attendance.setUnattendedAt(LocalDateTime.now());
        attendanceRepository.save(attendance);
    }
}
