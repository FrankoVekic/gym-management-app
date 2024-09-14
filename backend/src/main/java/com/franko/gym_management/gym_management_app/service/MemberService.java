package com.franko.gym_management.gym_management_app.service;


import com.franko.gym_management.gym_management_app.dto.*;

import java.time.LocalDateTime;
import java.util.List;

public interface MemberService {

    List<MemberDto> getMembers();

    MemberDto createMember(MemberDto memberDto);

    long getTotalMembers();

    Double getTotalPaid();

    List<MemberResponseDto> getMembersWithStatusesAndTrainingPackages();

    MemberProfileDto getMemberProfile(Long id);

    MemberDto getMemberByUserId(Long id);

    void updateMemberTrainingPackage(Long userId, TrainingPackageDto trainingPackageDto, LocalDateTime expirationDate);

    void updateMemberStatus(MemberStatusUpdateDto memberStatusUpdateDto);
}
