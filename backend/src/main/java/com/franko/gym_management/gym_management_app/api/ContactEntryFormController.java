package com.franko.gym_management.gym_management_app.api;

import com.franko.gym_management.gym_management_app.dto.ContactFormEntryDto;
import com.franko.gym_management.gym_management_app.service.ContactFormEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/contactFormEntries/")
public class ContactEntryFormController {

    @Autowired
    private ContactFormEntryService contactFormEntryService;


    @GetMapping("getAllContactEntries")
    public ResponseEntity<List<ContactFormEntryDto>> getAllContactEntries(){
        List<ContactFormEntryDto> contactFormEntries = contactFormEntryService.getContactFormEntries();
        return ResponseEntity.ok(contactFormEntries);

    }

    @PostMapping("addContactEntry")
    public ResponseEntity<ContactFormEntryDto> createContactEntry(@RequestBody ContactFormEntryDto contactFormEntryDto){
        ContactFormEntryDto savedContactEntry = contactFormEntryService.createContactFormEntry(contactFormEntryDto);
        return new ResponseEntity<>(savedContactEntry, org.springframework.http.HttpStatus.CREATED);
    }

}
