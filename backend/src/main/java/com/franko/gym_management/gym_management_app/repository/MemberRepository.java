package com.franko.gym_management.gym_management_app.repository;


import com.franko.gym_management.gym_management_app.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findAllByOrderByIdAsc();

    @Query(value = "SELECT SUM(tp.price) AS total_paid FROM members m JOIN training_packages tp ON m.trainingPackage.id = tp.id")
    Double getTotalPaid();

    @Query(value = """
    SELECT m.id, u.first_name, u.last_name, s.id, tp.name
    FROM users u
    LEFT JOIN members m ON m.user_id = u.id
    LEFT JOIN statuses s ON m.status_id = s.id
    LEFT JOIN training_packages tp ON m.training_package_id = tp.id
    WHERE u.role = 'MEMBER'
""", nativeQuery = true)
    List<Object[]> getMembersWithStatusesAndTrainingPackages();

    @Query(value = """
    SELECT u.first_name, u.last_name, u.email, u.image, u."role", tp."name" as trainingType, s.status_type as status, m.joined_date
    FROM users u
    LEFT JOIN members m ON m.user_id = u.id
    LEFT JOIN statuses s ON m.status_id = s.id
    LEFT JOIN training_packages tp ON m.training_package_id = tp.id
    WHERE u.id = :id
""", nativeQuery = true)
    List<Object[]> getProfileDetails(@Param("id") Long id);
    
    Optional<Member> findByUserId(Long userId);

    Member getMemberByUserId(Long userId);

}
