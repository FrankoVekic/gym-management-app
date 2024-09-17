package com.franko.gym_management.gym_management_app.serviceImpl;


import com.franko.gym_management.gym_management_app.dto.*;
import com.franko.gym_management.gym_management_app.exceptions.ResourceNotFoundException;
import com.franko.gym_management.gym_management_app.mapper.MemberMapper;
import com.franko.gym_management.gym_management_app.mapper.TrainingPackageMapper;
import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.repository.MemberRepository;
import com.franko.gym_management.gym_management_app.repository.StatusRepository;
import com.franko.gym_management.gym_management_app.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StatusRepository statusRepository;


    @Override
    public List<MemberDto> getMembers() {
        List<Member> users = memberRepository.findAllByOrderByIdAsc();
        return users.stream()
                .map(MemberMapper::mapToMemberDto)
                .collect(Collectors.toList());
    }

    @Override
    public MemberDto createMember(MemberDto memberDto) {

        Member member = MemberMapper.mapToMember(memberDto);
        Member savedMember = memberRepository.save(member);
        return MemberMapper.mapToMemberDto(savedMember);

    }

    @Override
    public long getTotalMembers() {
        return memberRepository.count();
    }

    @Override
    public Double getTotalPaid() {
        return memberRepository.getTotalPaid();
    }

    @Override
    public List<MemberResponseDto> getMembersWithStatusesAndTrainingPackages() {
        List<Object[]> results = memberRepository.getMembersWithStatusesAndTrainingPackages();
        List<MemberResponseDto> members = new ArrayList<>();

        for (Object[] result : results) {
            MemberResponseDto dto = new MemberResponseDto();
            dto.setId((Long) result[0]);
            dto.setFirstname((String) result[1]);
            dto.setLastname((String) result[2]);
            dto.setStatusId((Long) result[3]);
            dto.setTrainingPackage((String) result[4]);
            dto.setTrainingPackageExpirationDate(((Timestamp) result[5]).toLocalDateTime());

            members.add(dto);
        }

        return members;
    }

    @Override
    public MemberProfileDto getMemberProfile(Long id) {
        List<Object[]> result = memberRepository.getProfileDetails(id);

        if (result.isEmpty()) {
            throw new ResourceNotFoundException("No member found on ID: " + id);
        }

        Object[] userData = result.get(0);
        
        LocalDateTime joinedDate = userData[7] != null ? ((Timestamp) userData[7]).toLocalDateTime() : null;
        LocalDateTime trainingPackageExpirationDate = userData[8] != null ? ((Timestamp) userData[8]).toLocalDateTime() : null;

        return MemberProfileDto.builder()
                .firstName((String) userData[0])
                .lastName((String) userData[1])
                .email((String) userData[2])
                .image((String) userData[3])
                .role((String) userData[4])
                .trainingPackageName((String) userData[5])
                .status((String) userData[6])
                .joinedDate(joinedDate)
                .trainingPackageExpirationDate(trainingPackageExpirationDate)
                .build();
    }


    @Override
    public MemberDto getMemberByUserId(Long id) {
        return MemberMapper.mapToMemberDto(memberRepository.getMemberByUserId(id));

    }

    @Override
    public void updateMemberTrainingPackage(Long userId, TrainingPackageDto trainingPackageDto, LocalDateTime expirationDate) {
        MemberDto member = getMemberByUserId(userId);
        member.setTrainingPackage(TrainingPackageMapper.mapToTrainingPackage(trainingPackageDto));
        member.setTrainingPackageExpirationDate(expirationDate);
        member.setStatus(statusRepository.getReferenceById(1L));
        memberRepository.save(MemberMapper.mapToMember(member));
    }

    @Override
    public void updateMemberStatus(MemberStatusUpdateDto memberStatusUpdateDto) {

        Member member = memberRepository.findById(memberStatusUpdateDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Status status = statusRepository.findById(memberStatusUpdateDto.getStatusId())
                .orElseThrow(() -> new RuntimeException("Status not found"));

        member.setStatus(status);
        memberRepository.save(member);
    }

}