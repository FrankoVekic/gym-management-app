package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.TrainingTypeDto;
import com.franko.gym_management.gym_management_app.service.TrainingTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/trainingTypes/")
public class TrainingTypeController {


    @Autowired
    private TrainingTypeService trainingTypeService;

    @GetMapping("getTrainingTypes")
    public ResponseEntity<List<TrainingTypeDto>> getTrainingTypes(){
        List<TrainingTypeDto> trainingTypes = trainingTypeService.getTrainingTypes();
        return ResponseEntity.ok(trainingTypes);
    }

    @PostMapping("addTrainingType")
    public ResponseEntity<TrainingTypeDto> createTrainingType(@RequestBody TrainingTypeDto trainingTypeDto){
        TrainingTypeDto savedTrainingType = trainingTypeService.createTrainingType(trainingTypeDto);
        return new ResponseEntity<>(savedTrainingType, HttpStatus.CREATED);
    }
}
