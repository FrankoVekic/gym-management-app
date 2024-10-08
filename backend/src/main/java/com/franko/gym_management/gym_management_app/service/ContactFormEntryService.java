package com.franko.gym_management.gym_management_app.service;

import com.franko.gym_management.gym_management_app.dto.ContactFormEntryDto;
import com.franko.gym_management.gym_management_app.dto.ContactFormRequestDto;

import java.util.List;

public interface ContactFormEntryService {

    List<ContactFormEntryDto> getContactFormEntries();

    ContactFormEntryDto createContactFormEntry(ContactFormEntryDto contactFormEntryDto);

    void changeContactedStatus(ContactFormRequestDto contactFormRequestDto);
}
