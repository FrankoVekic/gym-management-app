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

import java.math.BigDecimal;
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
    private TestimonialRepository testimonialRepository;

    @Autowired
    private TestimonialUserRepository testimonialUserRepository;

    @Autowired
    private Faker faker;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    @Override
    public void run(String... args) throws Exception {
        if ("create-drop".equals(ddlAuto)) {

            insertTestimonials(2);
            insertTrainingPackages();
            insertTrainingTypes();
            insertStatuses();
            insertFakeUsersTrainerRole(2);
            insertFakeUsersMemberRole(10);
            insertUserTestimonials();
        }
    }

    private void insertTestimonials(int numberOfTestimonials) {
        int testimonialCounter = 0;

        while(testimonialCounter < numberOfTestimonials){
            var testimonial = Testimonial
                    .builder()
                    .content(faker.lorem().fixedString(100))
                    .build();

            testimonialRepository.save(testimonial);
            testimonialCounter++;
        }

    }

    private void insertTrainingPackages() {

        List<TrainingPackage> trainingPackages = new ArrayList<>();

        trainingPackages.add(TrainingPackage
                .builder()
                .name("Basic Training Package")
                .price(new BigDecimal(80.00))
                .features("3x per week training, Progress tracking")
                .build());

        trainingPackages.add(TrainingPackage
                .builder()
                .name("Medium Training Package")
                .price(new BigDecimal(100.00))
                .features("4x per week training, Personalized meal plan, Progress tracking")
                .build());

        trainingPackages.add(TrainingPackage
                .builder()
                .name("Premium Training Package")
                .price(new BigDecimal(120.00))
                .features("5x per week training, Personalized meal plan, Personal trainer present, Progress tracking")
                .build());

        trainingPackageRepository.saveAll(trainingPackages);
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

        for (StatusType type : StatusType.values()) {
            if (!statusRepository.existsById(type.ordinal() + 1L)) {
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

        var exampleUser = User
                .builder()
                .firstName("Franko")
                .lastName("Vekić")
                .email("franko.vekic@gmail.com")
                .image("")
                .password(passwordEncoder.encode("test123"))
                .role(Role.MEMBER)
                .build();

        userRepository.save(exampleUser);

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
    // FIXED TO INSERT 2 TESTIMONIALS FOR USERS
    private void insertUserTestimonials(){

        User userOne = userRepository.getReferenceById(1L);
        User userTwo = userRepository.getReferenceById(2L);

        Testimonial testimonialOne = testimonialRepository.getReferenceById(1L);
        Testimonial testimonialTwo = testimonialRepository.getReferenceById(2L);

        var testimonialUserOne = TestimonialUser
                .builder()
                .user(userOne)
                .testimonials(testimonialOne)
                .build();

        var testimonialUserTwo = TestimonialUser
                .builder()
                .user(userTwo)
                .testimonials(testimonialTwo)
                .build();

        testimonialUserRepository.save(testimonialUserOne);
        testimonialUserRepository.save(testimonialUserTwo);

    }

}
