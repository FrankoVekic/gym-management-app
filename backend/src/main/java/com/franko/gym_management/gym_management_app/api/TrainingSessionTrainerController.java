package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.TrainingSessionTrainerDto;
import com.franko.gym_management.gym_management_app.service.TrainingSessionTrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/trainingSessionTrainers/")
public class TrainingSessionTrainerController {

    @Autowired
    private TrainingSessionTrainerService trainingSessionTrainerService;

    @GetMapping("getTrainingSessionTrainer")
    public ResponseEntity<List<TrainingSessionTrainerDto>> addTrainingSessionTrainer (){
        List<TrainingSessionTrainerDto> trainingSessionTrainer = trainingSessionTrainerService.getAll();
        return ResponseEntity.ok(trainingSessionTrainer);
    }

    @PostMapping("addTrainingSessionTrainer")
    public ResponseEntity<TrainingSessionTrainerDto> createTrainingSessionTrainer(@RequestBody TrainingSessionTrainerDto trainingSessionTrainerDto){
        TrainingSessionTrainerDto savedTrainingSessionTrainer = trainingSessionTrainerService.createTrainingSessionTrainer(trainingSessionTrainerDto);
        return new ResponseEntity<>(savedTrainingSessionTrainer, HttpStatus.CREATED);
    }

}
