package com.franko.gym_management.gym_management_app.mapper;

import com.franko.gym_management.gym_management_app.dto.MemberDto;
import com.franko.gym_management.gym_management_app.model.Member;

import java.util.List;
import java.util.stream.Collectors;

public class MemberMapper {


    public static MemberDto mapToMemberDto(Member member) {
        return new MemberDto(
            member.getId(),
            member.getUser(),
            member.getStatus(),
            member.getJoinedDate(),
            member.getAttendances()
        );
    }

    public static Member mapToMember(MemberDto memberDto){
        return new Member(
            memberDto.getId(),
            memberDto.getUser(),
            memberDto.getStatus(),
            memberDto.getJoinedDate(),
            memberDto.getAttendances()
        );
    }

    public static List<MemberDto> mapToMemberDto(List<Member> members){
        return members.stream()
                .map(MemberMapper::mapToMemberDto)
                .collect(Collectors.toList());
    }
}
