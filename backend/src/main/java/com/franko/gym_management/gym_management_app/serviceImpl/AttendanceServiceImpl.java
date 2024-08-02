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

        Optional<Member> member = Optional.ofNullable(memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Member does not exist")));

        TrainingSession trainingSession = trainingSessionRepository.findById(trainingSessionId)
                .orElseThrow(() -> new RuntimeException("Training session does not exist"));

        Long userExists = attendanceRepository.checkAttendance(userId, trainingSessionId);

        // TODO: CREATE A EXCEPTION FOR THIS
        if(userExists != 0){
            throw new IllegalArgumentException("Member is already registered in this training session");
        }

        Attendance attendance = Attendance
                .builder()
                .member(member.get())
                .trainingSession(trainingSession)
                .build();

        attendanceRepository.save(attendance);

        return AttendanceMapper.mapToAttendanceDto(attendance);

    }


}
