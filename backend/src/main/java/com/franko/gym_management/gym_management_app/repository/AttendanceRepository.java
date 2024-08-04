package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    List<Attendance> findAllByOrderByIdAsc();

    @Query(value = """
    SELECT COUNT(a) FROM attendances a
    INNER JOIN members m 
    ON m.id = a.member_id
    INNER JOIN users u 
    ON u.id = m.user_id
    WHERE u.id = :userId 
    AND 
    a.training_session_id = :trainingSessionId
    AND 
    a.unattended_at IS NULL
""", nativeQuery = true)
    Long checkAttendance(@Param("userId") Long userId, @Param("trainingSessionId") Long trainingSessionId);

    Attendance findByMemberIdAndTrainingSessionIdAndUnattendedAtIsNull(Long memberId, Long trainingSessionId);

    Attendance findByMemberIdAndTrainingSessionIdAndUnattendedAtIsNotNull(Long memberId, Long trainingSessionId);

}
