package com.franko.gym_management.gym_management_app.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.franko.gym_management.gym_management_app.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "varchar(255)",name = "first_name",nullable = false)
    private String firstName;

    @Column(columnDefinition = "varchar(255)",name = "last_name", nullable = false)
    private String lastName;

    @Email
    @Column(columnDefinition = "varchar(255)",nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(columnDefinition = "varchar(255)")
    private String image;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<TestimonialUser> testimonials;

    @Column(columnDefinition = "varchar(255)")
    private String resetToken;

    private LocalDateTime tokenExpiryTime;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
