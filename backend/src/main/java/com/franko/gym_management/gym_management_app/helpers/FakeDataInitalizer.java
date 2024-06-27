package com.franko.gym_management.gym_management_app.helpers;


import com.franko.gym_management.gym_management_app.enums.Role;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.UserRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("init-data")
public class FakeDataInitalizer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Faker faker;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    @Override
    public void run(String... args) throws Exception {
        if("create-drop".equals(ddlAuto)){

            insertFakeUsersTrainerRole(2);
            insertFakeUsersMemberRole(10);
        }
    }

    private void insertFakeUsersMemberRole(int numberOfMemberUsers) {

        int memberCounter = 1;

        while (memberCounter <= numberOfMemberUsers) {
            var user = User
                    .builder()
                    .firstName(faker.name().firstName())
                    .lastName(faker.name().lastName())
                    .email(faker.internet().emailAddress())
                    .image("logo" + memberCounter + ".jpg")
                    .password(passwordEncoder.encode("test123"))
                    .role(Role.MEMBER)
                    .build();

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                continue;
            }
            userRepository.save(user);
            memberCounter++;
        }

    }

    private void insertFakeUsersTrainerRole(int numberOfTrainerUsers) {

        int trainerCounter = 1;

        while (trainerCounter <= numberOfTrainerUsers) {
            var user = User
                    .builder()
                    .firstName(faker.name().firstName())
                    .lastName(faker.name().lastName())
                    .email(faker.internet().emailAddress())
                    .password(passwordEncoder.encode("test123"))
                    .image("logo" + trainerCounter + ".jpg")
                    .role(Role.TRAINER)
                    .build();

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                continue;
            }
            userRepository.save(user);
            trainerCounter++;
        }

    }


}
