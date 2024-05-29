package com.franko.gym_management.gym_management_app.service;


import com.franko.gym_management.gym_management_app.dto.MemberDto;

import java.util.List;

public interface MemberService {

    List<MemberDto> getMembers();

    MemberDto createMember(MemberDto memberDto);

}
