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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


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
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TestimonialUserRepository testimonialUserRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private Faker faker;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;
    @Autowired
    private TrainingSessionRepository trainingSessionRepository;

    @Override
    public void run(String... args) throws Exception {
        if ("create-drop".equals(ddlAuto)) {

            insertTestimonials(5);
            insertTrainingPackages();
            insertTrainingTypes();
            insertStatuses();
            insertFakeUsersTrainerRole(2);
            insertFakeUsersMemberRole(10);
            insertUserTestimonials();
            insertBlogs();
            insertTrainingSessions();
            insertAttendance();
        }
    }

    private void insertAttendance() {

        Member memberOne = memberRepository.getReferenceById(1L);
        Member memberTwo = memberRepository.getReferenceById(2L);
        Member memberThree = memberRepository.getReferenceById(3L);
        Member memberFour = memberRepository.getReferenceById(4L);
        Member memberFive = memberRepository.getReferenceById(5L);
        Member memberSix = memberRepository.getReferenceById(6L);
        Member memberSeven = memberRepository.getReferenceById(7L);

        TrainingSession sessionOne = trainingSessionRepository.getReferenceById(1L);
        TrainingSession sessionTwo = trainingSessionRepository.getReferenceById(2L);
        TrainingSession sessionThree = trainingSessionRepository.getReferenceById(3L);

        List<Attendance> attendanceList = new ArrayList<>();

        attendanceList.add(
                Attendance
                        .builder()
                        .member(memberOne)
                        .trainingSession(sessionOne)
                        .build()
        );
        attendanceList.add(
                Attendance
                        .builder()
                        .member(memberTwo)
                        .trainingSession(sessionOne)
                        .build()
        );
        attendanceList.add(
                Attendance
                        .builder()
                        .member(memberThree)
                        .trainingSession(sessionOne)
                        .build()
        );
        attendanceList.add(
                Attendance
                        .builder()
                        .member(memberFour)
                        .trainingSession(sessionTwo)
                        .build()
        );
        attendanceList.add(
                Attendance
                        .builder()
                        .member(memberFive)
                        .trainingSession(sessionTwo)
                        .build()
        );
        attendanceList.add(
                Attendance
                        .builder()
                        .member(memberSix)
                        .trainingSession(sessionOne)
                        .build()
        );
        attendanceList.add(
                Attendance
                        .builder()
                        .member(memberSeven)
                        .trainingSession(sessionThree)
                        .build()
        );

        attendanceRepository.saveAll(attendanceList);

    }

  /*  private void insertTrainingSessionTrainers() {

        Trainer trainerOne = trainerRepository.getReferenceById(1L);
        Trainer trainerTwo = trainerRepository.getReferenceById(2L);

        TrainingSession sessionOne = trainingSessionRepository.getReferenceById(1L);
        TrainingSession sessionTwo = trainingSessionRepository.getReferenceById(2L);
        TrainingSession sessionThree = trainingSessionRepository.getReferenceById(3L);
        TrainingSession sessionFour = trainingSessionRepository.getReferenceById(4L);
        TrainingSession sessionFive = trainingSessionRepository.getReferenceById(5L);
        TrainingSession sessionSix = trainingSessionRepository.getReferenceById(6L);
        TrainingSession sessionSeven = trainingSessionRepository.getReferenceById(7L);
        TrainingSession sessionEight = trainingSessionRepository.getReferenceById(8L);

        List<TrainingSessionTrainer> sessions = new ArrayList<>();

        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionOne)
                        .trainer(trainerOne)
                        .build()
        );

        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionTwo)
                        .trainer(trainerTwo)
                        .build()
        );

        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionThree)
                        .trainer(trainerOne)
                        .build()
        );

        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionFour)
                        .trainer(trainerOne)
                        .build()
        );
        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionFive)
                        .trainer(trainerOne)
                        .build()
        );
        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionSix)
                        .trainer(trainerOne)
                        .build()
        );
        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionSeven)
                        .trainer(trainerTwo)
                        .build()
        );
        sessions.add(
                TrainingSessionTrainer
                        .builder()
                        .trainingSession(sessionEight)
                        .trainer(trainerTwo)
                        .build()
        );

        trainingSessionTrainerRepository.saveAll(sessions);
    } */

    private void insertTrainingSessions() {


        TrainingType t1 = trainingTypeRepository.getReferenceById(1L);
        TrainingType t2 = trainingTypeRepository.getReferenceById(2L);
        TrainingType t3 = trainingTypeRepository.getReferenceById(3L);

        List<TrainingSession> trainingSessions = new ArrayList<>();

        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(2))
                        .trainingType(t1)
                        .trainer(trainerRepository.getReferenceById(1L))
                        .build()
        );

        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(4))
                        .trainingType(t2)
                        .trainer(trainerRepository.getReferenceById(1L))
                        .build()
        );

        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(3))
                        .trainingType(t3)
                        .trainer(trainerRepository.getReferenceById(1L))
                        .build()
        );

        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(6))
                        .trainingType(t3)
                        .trainer(trainerRepository.getReferenceById(1L))
                        .build()
        );

        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(3))
                        .trainingType(t3)
                        .trainer(trainerRepository.getReferenceById(1L))
                        .build()
        );

        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(3))
                        .trainingType(t1)
                        .trainer(trainerRepository.getReferenceById(2L))
                        .build()
        );

        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(3))
                        .trainingType(t2)
                        .trainer(trainerRepository.getReferenceById(2L))
                        .build()
        );
        trainingSessions.add(
                TrainingSession
                        .builder()
                        .date(LocalDateTime.now().plusDays(3))
                        .trainingType(t3)
                        .trainer(trainerRepository.getReferenceById(2L))
                        .build()
        );

        trainingSessionRepository.saveAll(trainingSessions);

    }

    private void insertBlogs() {

        Long number = 1L;

        for (int i = 1; i < 6; i++) {

            User author = getRandomUser(number).get();

            Blog blog = Blog
                    .builder()
                    .title(faker.lorem().fixedString(15))
                    .content(faker.lorem().fixedString(80))
                    .author(author)
                    .build();
            number++;

            blogRepository.save(blog);


            Comment comment = Comment
                    .builder()
                    .content(faker.lorem().fixedString(35))
                    .blog(blog)
                    .user(author)
                    .build();

            commentRepository.save(comment);

        }
    }

    private Optional<User> getRandomUser(Long i) {
        Long randomUserId = i;
        return userRepository.findById(randomUserId);
    }

    private void insertTestimonials(int numberOfTestimonials) {
        int testimonialCounter = 0;

        while (testimonialCounter < numberOfTestimonials) {
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

        Status dummyStatus = statusRepository.getReferenceById(1L);

        TrainingPackage dummyTrainingPackage = trainingPackageRepository.getReferenceById(3L);


        Member member = Member
                .builder()
                .user(exampleUser)
                .trainingPackage(dummyTrainingPackage)
                .status(dummyStatus)
                .build();

        memberRepository.save(member);

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

            TrainingPackage trainingPackage = trainingPackageRepository.getReferenceById(3L);


            Member exampleMember = Member
                    .builder()
                    .user(savedMember)
                    .trainingPackage(trainingPackage)
                    .status(activeStatus)
                    .build();

            memberRepository.save(exampleMember);

        }

    }

    private void insertFakeUsersTrainerRole(int numberOfTrainerUsers) {

        int trainerCounter = 1;

        var exampleUser = User
                .builder()
                .firstName("Test")
                .lastName("Testich")
                .email("test@gmail.com")
                .image("")
                .password(passwordEncoder.encode("test123"))
                .role(Role.TRAINER)
                .build();

        User test = userRepository.save(exampleUser);

        Status availableStatusEx = statusRepository.getReferenceById(6L);

        Trainer trainerEx = Trainer
                .builder()
                .user(test)
                .status(availableStatusEx)
                .description(faker.lorem().fixedString(800))
                .build();

        trainerRepository.save(trainerEx);

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

    private void insertUserTestimonials() {

        User userOne = userRepository.getReferenceById(1L);
        User userTwo = userRepository.getReferenceById(2L);
        User userThree = userRepository.getReferenceById(3L);
        User userFour = userRepository.getReferenceById(4L);
        User userFive = userRepository.getReferenceById(5L);

        Testimonial testimonialOne = testimonialRepository.getReferenceById(1L);
        Testimonial testimonialTwo = testimonialRepository.getReferenceById(2L);
        Testimonial testimonialThree = testimonialRepository.getReferenceById(3L);
        Testimonial testimonialFour = testimonialRepository.getReferenceById(4L);
        Testimonial testimonialFive = testimonialRepository.getReferenceById(5L);

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

        var testimonialUserThree = TestimonialUser
                .builder()
                .user(userThree)
                .testimonials(testimonialThree)
                .build();

        var testimonialUserFour = TestimonialUser
                .builder()
                .user(userFour)
                .testimonials(testimonialFour)
                .build();

        var testimonialUserFive = TestimonialUser
                .builder()
                .user(userFive)
                .testimonials(testimonialFive)
                .build();

        testimonialUserRepository.save(testimonialUserOne);
        testimonialUserRepository.save(testimonialUserTwo);
        testimonialUserRepository.save(testimonialUserThree);
        testimonialUserRepository.save(testimonialUserFour);
        testimonialUserRepository.save(testimonialUserFive);
    }


}
