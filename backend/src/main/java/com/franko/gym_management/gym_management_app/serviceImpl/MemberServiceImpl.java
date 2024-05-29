package com.franko.gym_management.gym_management_app.serviceImpl;


import com.franko.gym_management.gym_management_app.dto.MemberDto;
import com.franko.gym_management.gym_management_app.mapper.MemberMapper;
import com.franko.gym_management.gym_management_app.mapper.UserMapper;
import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.MemberRepository;
import com.franko.gym_management.gym_management_app.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
