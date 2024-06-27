package com.franko.gym_management.gym_management_app.helpers;


import com.franko.gym_management.gym_management_app.enums.Role;
import com.franko.gym_management.gym_management_app.enums.StatusType;
import com.franko.gym_management.gym_management_app.model.Member;
import com.franko.gym_management.gym_management_app.model.Status;
import com.franko.gym_management.gym_management_app.model.Trainer;
import com.franko.gym_management.gym_management_app.model.User;
import com.franko.gym_management.gym_management_app.repository.MemberRepository;
import com.franko.gym_management.gym_management_app.repository.StatusRepository;
import com.franko.gym_management.gym_management_app.repository.TrainerRepository;
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
    private MemberRepository memberRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private Faker faker;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    @Override
    public void run(String... args) throws Exception {
        if("create-drop".equals(ddlAuto)){

            insertStatuses();
            insertFakeUsersTrainerRole(2);
            insertFakeUsersMemberRole(10);
        }
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
