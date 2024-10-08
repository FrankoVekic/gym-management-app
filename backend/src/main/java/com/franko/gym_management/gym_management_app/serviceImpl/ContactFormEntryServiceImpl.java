package com.franko.gym_management.gym_management_app.serviceImpl;

import com.franko.gym_management.gym_management_app.dto.ContactFormEntryDto;
import com.franko.gym_management.gym_management_app.dto.ContactFormRequestDto;
import com.franko.gym_management.gym_management_app.mapper.ContactFormEntryMapper;
import com.franko.gym_management.gym_management_app.model.ContactFormEntry;
import com.franko.gym_management.gym_management_app.repository.ContactFormEntryRepository;
import com.franko.gym_management.gym_management_app.service.ContactFormEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactFormEntryServiceImpl implements ContactFormEntryService {

    @Autowired
    private ContactFormEntryRepository contactFormEntryRepository;
    @Override
    public List<ContactFormEntryDto> getContactFormEntries() {
        List<ContactFormEntry> list = contactFormEntryRepository.findAllByOrderByIdDesc();
        return list
                .stream()
                .map(ContactFormEntryMapper::mapToContactFormEntriesDto)
                .collect(Collectors.toList());
    }

    @Override
    public ContactFormEntryDto createContactFormEntry(ContactFormEntryDto contactFormEntryDto) {
        ContactFormEntry contactFormEntry = ContactFormEntryMapper.mapToContactFormEntries(contactFormEntryDto);
        contactFormEntry.setContacted(false);
        return ContactFormEntryMapper.mapToContactFormEntriesDto(contactFormEntryRepository.save(contactFormEntry));
    }

    @Override
    public void changeContactedStatus(ContactFormRequestDto contactFormRequestDto) {

        ContactFormEntry cf = contactFormEntryRepository.findById(contactFormRequestDto.getId()).orElseThrow(
                () -> new RuntimeException("Contact form not found with given id"));

        cf.setContacted(contactFormRequestDto.isContacted());
        contactFormEntryRepository.save(cf);

    }
}
