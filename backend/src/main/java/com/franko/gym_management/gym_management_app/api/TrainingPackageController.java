package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.TrainingPackageDto;
import com.franko.gym_management.gym_management_app.service.TrainingPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public/trainingPackages/")
public class TrainingPackageController {

    @Autowired
    private TrainingPackageService trainingPackageService;

    @GetMapping("getAllTrainingPackages")
    public ResponseEntity<List<TrainingPackageDto>> getAllTrainingPackages(){
        List<TrainingPackageDto> trainingPackages = trainingPackageService.getTrainingPackages();
        return ResponseEntity.ok(trainingPackages);
    }

    @PostMapping("createTrainingPackage")
    public ResponseEntity<TrainingPackageDto> createTrainingPackage(TrainingPackageDto trainingPackageDto){
        TrainingPackageDto savedTrainingPackage = trainingPackageService.createTrainingPackage(trainingPackageDto);
        return new ResponseEntity<>(savedTrainingPackage, org.springframework.http.HttpStatus.CREATED);
    }

}
