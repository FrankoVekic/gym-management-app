package com.franko.gym_management.gym_management_app.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .securityMatcher("/**")
                .authorizeHttpRequests(request -> {
                    request.requestMatchers("/public/**").permitAll()
                            .requestMatchers("/api/v1/**").permitAll()
                            .anyRequest().authenticated();
                }).build();
    }

}
