package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.TrainerDto;
import com.franko.gym_management.gym_management_app.dto.TrainerNameDto;
import com.franko.gym_management.gym_management_app.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/trainers/")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @GetMapping("getTrainers")
    public ResponseEntity<List<TrainerDto>> getTrainers(){
        List<TrainerDto> trainers = trainerService.getTrainers();
        return ResponseEntity.ok(trainers);
    }

    @PostMapping("addTrainer")
    public ResponseEntity<TrainerDto> createTrainer(@RequestBody TrainerDto trainerDto){
        TrainerDto savedTrainer = trainerService.createTrainer(trainerDto);
        return new ResponseEntity<>(savedTrainer, HttpStatus.CREATED);
    }

    @GetMapping("getFirstnamesAndLastnames")
    public ResponseEntity<List<TrainerNameDto>> getTrainerNamesAndLastnames(){
        List<TrainerNameDto> trainers = trainerService.getTrainerNames();
        return ResponseEntity.ok(trainers);
    }


}
