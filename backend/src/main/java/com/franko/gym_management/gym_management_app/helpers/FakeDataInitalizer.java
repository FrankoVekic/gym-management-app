package com.franko.gym_management.gym_management_app.helpers;


import com.franko.gym_management.gym_management_app.enums.Role;
import com.franko.gym_management.gym_management_app.enums.StatusType;
import com.franko.gym_management.gym_management_app.model.*;
import com.franko.gym_management.gym_management_app.repository.*;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
@Profile("init-data")
public class FakeDataInitalizer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private TrainingTypeRepository trainingTypeRepository;

    @Autowired
    private TrainingPackageRepository trainingPackageRepository;

    @Autowired
    private Faker faker;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    @Override
    public void run(String... args) throws Exception {
        if("create-drop".equals(ddlAuto)){
            
            insertTrainingTypes();
            insertStatuses();
            insertFakeUsersTrainerRole(2);
            insertFakeUsersMemberRole(10);
        }
    }

    private void insertTrainingTypes() {

        List<TrainingType> trainingTypes = new ArrayList<>();
        trainingTypes.add(TrainingType
                .builder()
                .name("Pilates Training")
                .durationInMinutes(60)
                .description(faker.lorem().fixedString(500))
                .image("pilates.jpg")
                .build());

        trainingTypes.add(TrainingType
                .builder()
                .name("Strength Training")
                .durationInMinutes(45)
                .description(faker.lorem().fixedString(500))
                .image("strength.jpg")
                .build());

        trainingTypes.add(TrainingType
                .builder()
                .name("HIIT Training")
                .durationInMinutes(30)
                .description(faker.lorem().fixedString(500))
                .image("hiit.jpg")
                .build());

        trainingTypes.add(TrainingType
                .builder()
                .name("Yoga Training")
                .durationInMinutes(30)
                .description(faker.lorem().fixedString(500))
                .image("yoga.jpg")
                .build());

        trainingTypeRepository.saveAll(trainingTypes);

    }

    private void insertStatuses() {

        for(StatusType type : StatusType.values()){
            if(!statusRepository.existsById(type.ordinal() + 1L)){
                Status status = Status
                        .builder()
                        .statusType(type)
                        .build();

                statusRepository.save(status);
            }
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
            User savedMember = userRepository.save(user);
            memberCounter++;

            Status activeStatus = statusRepository.getReferenceById(1L);

            Member member = Member
                    .builder()
                    .user(savedMember)
                    .status(activeStatus)
                    .build();

            memberRepository.save(member);

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
            User savedTrainer = userRepository.save(user);
            trainerCounter++;

            Status availableStatus = statusRepository.getReferenceById(6L);

            Trainer trainer = Trainer
                    .builder()
                    .user(savedTrainer)
                    .status(availableStatus)
                    .description(faker.lorem().fixedString(800))
                    .build();

            trainerRepository.save(trainer);

        }

    }


}
