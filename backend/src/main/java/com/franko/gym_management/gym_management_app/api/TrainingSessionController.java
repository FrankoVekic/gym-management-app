package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.service.TrainingSessionService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/trainingSessions/")
public class TrainingSessionController {

    @Autowired
    private TrainingSessionService trainingSessionService;

    @GetMapping("getTrainingSessions")
    public ResponseEntity<List<TrainingSessionDto>> getTrainingSessions() {
        List<TrainingSessionDto> trainingSessions = trainingSessionService.getTrainingSessions();
        return ResponseEntity.ok(trainingSessions);
    }

    @PostMapping("addTrainingSession")
    public ResponseEntity<TrainingSessionDto> createTrainingSession(@RequestBody TrainingSessionDto trainingSessionDto) {
        TrainingSessionDto savedTrainingSession = trainingSessionService.createTrainingSession(trainingSessionDto);
        return new ResponseEntity<>(savedTrainingSession, HttpStatus.CREATED);
    }

    @GetMapping("trainingSessionsCount")
    public ResponseEntity<Long> getTotalTrainingSessions() {
        long count = trainingSessionService.getTotalTrainingSessionsCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("upcomingTrainingSessions")
    public List<TrainingSessionResponseDto> getUpcomingTrainingSessions() {
        return trainingSessionService.getUpcomingTrainingSessions();
    }

    @PostMapping("userTrainingSessions")
    public ResponseEntity<List<UserTrainingSessionsDto>> getUserUpcomingTrainingSessions(@RequestBody UserTrainingSessionRequest userTrainingSessionRequest) {
        List<UserTrainingSessionsDto> list = trainingSessionService.getUpcomingUserTrainingSessions(userTrainingSessionRequest.getId());
        return ResponseEntity.ok(list);
    }

    @PostMapping("deleteTrainingSession")
    public ResponseEntity<String> deleteTrainingSession(@RequestBody DeleteBlogRequestDto deleteBlogRequestDto){

        trainingSessionService.softDeleteById(deleteBlogRequestDto.getId());

        return ResponseEntity.ok().build();
    }

    @PutMapping("updateTrainingSession")
    public ResponseEntity<String> updateTrainingSession(@RequestBody TrainingSessionUpdateDto trainingSessionUpdateDto){

        TrainingSessionUpdateDto ts = trainingSessionService.updateTrainingSession(trainingSessionUpdateDto);

        return ResponseEntity.ok("Training Session successfully updated");

    }
}

