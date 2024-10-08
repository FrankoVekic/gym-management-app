package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.StatusDto;
import com.franko.gym_management.gym_management_app.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/public/statuses/")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @GetMapping("getStatuses")
    public ResponseEntity<List<StatusDto>> getAllStatuses() {
        List<StatusDto> statuses = statusService.getStatuses();
        return ResponseEntity.ok(statuses);
    }

    @GetMapping("getMemberStatuses")
    public ResponseEntity<List<StatusDto>> getMemberStatuses() {
        List<StatusDto> statuses = statusService.getStatuses().stream().limit(5).toList();
        return ResponseEntity.ok(statuses);
    }

    @GetMapping("getTrainerStatuses")
    public ResponseEntity<List<StatusDto>> getTrainerStatuses() {
        List<StatusDto> statuses = statusService.getStatuses().stream().filter(statusDto -> statusDto.getId() > 5).collect(Collectors.toList());
        return ResponseEntity.ok(statuses);
    }

    @PostMapping("addStatus")
    public ResponseEntity<StatusDto> createStatus(@RequestBody StatusDto statusDto) {
        StatusDto savedStatus = statusService.createStatus(statusDto);
        return new ResponseEntity<>(savedStatus, HttpStatus.CREATED);
    }

    @PostMapping("addStatusList")
    public ResponseEntity<List<StatusDto>> createMultipleStatuses(@RequestBody List<StatusDto> statuses) {
        List<StatusDto> savedStatuses = statusService.addMultipleStatuses(statuses);
        return new ResponseEntity<>(savedStatuses, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<StatusDto> updateStatus(@PathVariable("id") Long id, @RequestBody StatusDto statusDto) {
        StatusDto updatedStatus = statusService.updateStatus(id, statusDto);
        return ResponseEntity.ok(updatedStatus);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStatus(@PathVariable("id") Long id) {
        statusService.deleteStatus(id);
        return ResponseEntity.ok("User with ID: " + id + " has been deleted");
    }
}
