package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.ContactFormEntryDto;
import com.franko.gym_management.gym_management_app.model.ContactFormEntry;

public class ContactFormEntryMapper {

    public static ContactFormEntry mapToContactFormEntries(ContactFormEntryDto contactFormEntriesDto) {
        return new ContactFormEntry(
                contactFormEntriesDto.getId(),
                contactFormEntriesDto.getFullName(),
                contactFormEntriesDto.getEmail(),
                contactFormEntriesDto.getPhoneNumber(),
                contactFormEntriesDto.getMessage(),
                contactFormEntriesDto.getCreatedAt()
        );
    }

    public static ContactFormEntryDto mapToContactFormEntriesDto(ContactFormEntry contactFormEntries) {
        return new ContactFormEntryDto(
                contactFormEntries.getId(),
                contactFormEntries.getFullName(),
                contactFormEntries.getEmail(),
                contactFormEntries.getPhoneNumber(),
                contactFormEntries.getMessage(),
                contactFormEntries.getCreatedAt()
        );
    }
}
