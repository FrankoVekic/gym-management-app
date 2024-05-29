package com.franko.gym_management.gym_management_app.api;


import com.franko.gym_management.gym_management_app.dto.MemberDto;
import com.franko.gym_management.gym_management_app.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/members/")
public class MemberController {


    @Autowired
    private MemberService  memberService;

    @GetMapping("getMembers")
    public ResponseEntity<List<MemberDto>> getMembers(){
        List<MemberDto> members = memberService.getMembers();
        return ResponseEntity.ok(members);
    }

    @PostMapping("addMember")
    public ResponseEntity<MemberDto> createMember(@RequestBody MemberDto memberDto){
        MemberDto savedMember = memberService.createMember(memberDto);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }



}
