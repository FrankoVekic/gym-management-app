package com.franko.gym_management.gym_management_app.repository;


import com.franko.gym_management.gym_management_app.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findAllByOrderByIdAsc();

    @Query(value = "SELECT SUM(tp.price) AS total_paid FROM members m JOIN training_packages tp ON m.trainingPackage.id = tp.id")
    Double getTotalPaid();

    @Query(value = """
    SELECT u.first_name, u.last_name, s.status_type, tp.name
    FROM users u
    LEFT JOIN members m ON m.user_id = u.id
    LEFT JOIN statuses s ON m.status_id = s.id
    LEFT JOIN training_packages tp ON m.training_package_id = tp.id
    WHERE u.role = 'MEMBER'
""", nativeQuery = true)
    List<Object[]> getMembersWithStatusesAndTrainingPackages();

}
