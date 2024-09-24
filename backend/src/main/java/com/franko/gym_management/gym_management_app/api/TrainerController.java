package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.service.TrainerService;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("getTrainerProfile")
    public ResponseEntity<TrainerProfileDto> getTrainerProfile(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        TrainerProfileDto trainerProfile = trainerService.getTrainerProfile(userId);
        return ResponseEntity.ok(trainerProfile);
    }

    @PutMapping("updateTrainerStatus")
    public ResponseEntity<String> updateTrainerStatus(@RequestBody UpdateTrainerStatusDto updateTrainerStatusDto){

        try{
            trainerService.updateTrainerStatus(updateTrainerStatusDto);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the trainer status");
        }
        return ResponseEntity.ok("Trainers Status is successfully updated");
    }

    @PostMapping("removeTrainer")
    public ResponseEntity<String> removeTrainer(@RequestBody DeleteBlogRequestDto deleteBlogRequestDto){

        trainerService.softRemoveById(deleteBlogRequestDto.getId());

        return ResponseEntity.ok().build();

    }

}
