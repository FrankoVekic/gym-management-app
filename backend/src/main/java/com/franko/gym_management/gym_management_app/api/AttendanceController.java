package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.AttendanceDto;
import com.franko.gym_management.gym_management_app.dto.CheckAttendanceDto;
import com.franko.gym_management.gym_management_app.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/attendances/")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("getAttendances")
    public ResponseEntity<List<AttendanceDto>> getAttendances() {
        List<AttendanceDto> list = attendanceService.getAttendances();
        return ResponseEntity.ok(list);
    }

    @PostMapping("addAttendance")
    public ResponseEntity<AttendanceDto> createAttendance(@RequestBody AttendanceDto attendanceDto) {
        AttendanceDto savedAttendance = attendanceService.createAttendance(attendanceDto);
        return new ResponseEntity<>(savedAttendance, org.springframework.http.HttpStatus.CREATED);
    }

    @PostMapping("checkAttendance")
    public ResponseEntity<Long> checkAttendance(@RequestBody CheckAttendanceDto checkAttendanceDto) {
        Long result = attendanceService.checkAttendance(checkAttendanceDto);
        return ResponseEntity.ok(result);
    }

    @PostMapping("registerForTraining")
    public ResponseEntity<AttendanceDto> registerForTraining(@RequestBody CheckAttendanceDto checkAttendanceDto) {

        AttendanceDto attendanceDto =
                attendanceService.registerForTraining
                        (checkAttendanceDto.getUserId(),
                                checkAttendanceDto.getTrainingSessionId());

        return new ResponseEntity<>(attendanceDto, HttpStatus.CREATED);

    }

    @PostMapping("unregisterFromTraining")
    public ResponseEntity<String> unregisterFromTraining(@RequestBody CheckAttendanceDto checkAttendanceDto) {
        attendanceService.unregisterFromTraining(checkAttendanceDto.getUserId(), checkAttendanceDto.getTrainingSessionId());
        return ResponseEntity.ok("Unregistered successfully");
    }

}
