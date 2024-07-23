package com.franko.gym_management.gym_management_app.serviceImpl;


import com.franko.gym_management.gym_management_app.dto.MemberDto;
import com.franko.gym_management.gym_management_app.dto.MemberResponseDto;
import com.franko.gym_management.gym_management_app.mapper.MemberMapper;
import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.repository.MemberRepository;
import com.franko.gym_management.gym_management_app.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService {

        @Autowired
        private MemberRepository memberRepository;


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
            dto.setFirstname((String) result[0]);
            dto.setLastname((String) result[1]);
            dto.setStatus((String) result[2]);
            dto.setTrainingPackage((String) result[3]);

            members.add(dto);
        }

        return members;    }
}
