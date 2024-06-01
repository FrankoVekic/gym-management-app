package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.StatusDto;
import com.franko.gym_management.gym_management_app.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("addStatus")
    public ResponseEntity<StatusDto> createStatus(@RequestBody StatusDto statusDto) {
        StatusDto savedStatus = statusService.createStatus(statusDto);
        return new ResponseEntity<>(savedStatus, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStatus(@PathVariable("id") Long id) {
        statusService.deleteStatus(id);
        return ResponseEntity.ok("User with ID: " + id + " has been deleted");
    }
}
