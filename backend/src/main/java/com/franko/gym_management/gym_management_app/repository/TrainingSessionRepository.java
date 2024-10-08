package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.TrainingSession;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingSessionRepository extends JpaRepository<TrainingSession, Long> {

    List<TrainingSession> findAllByOrderByIdAsc();

    @Query(value = """
            SELECT
                ts.id AS session_id,
                tt.name AS training_type,
                ts.date AS session_date,
                COUNT(a.id) AS number_of_people,
                ARRAY_AGG(DISTINCT u.first_name || ' ' || u.last_name) AS trainer,
                tt.duration_in_minutes AS duration,
                tt.description
            FROM
                training_sessions ts
            JOIN
                training_types tt ON ts.training_type_id = tt.id
            LEFT JOIN
                attendances a ON ts.id = a.training_session_id AND a.unattended_at IS NULL
            LEFT JOIN
                trainers t ON ts.trainer_id = t.id
            LEFT JOIN
                users u ON t.user_id = u.id
            WHERE
                ts.date > NOW()
            AND 
                ts.deleted_at is null
            GROUP BY
                ts.id, tt.name, ts.date, tt.duration_in_minutes, tt.description
            ORDER BY
                ts.date ASC
                    """, nativeQuery = true)
    List<Object[]> findUpcomingTrainingSessions();

    @Query(value = """
            SELECT
                               ts.id AS session_id,
                               tt.name AS training_type,
                               ts.date AS session_date,
                               ARRAY_AGG(DISTINCT CONCAT(u.first_name, ' ', u.last_name)) AS trainers,
                               tt.duration_in_minutes AS duration,
                               tt.description
                           FROM
                               training_sessions ts
                           JOIN
                               training_types tt ON ts.training_type_id = tt.id
                           LEFT JOIN
                               attendances a ON ts.id = a.training_session_id AND a.unattended_at IS NULL
                           LEFT JOIN
                               trainers t ON ts.trainer_id = t.id
                           LEFT JOIN
                               users u ON t.user_id = u.id
                           WHERE
                               a.member_id IN (
                                   SELECT id FROM members WHERE user_id = :id
                               )
                           AND 
                               ts.deleted_at is null
                           GROUP BY
                               ts.id, tt.name, ts.date, tt.duration_in_minutes, tt.description
                           ORDER BY
                               ts.date DESC
            """, nativeQuery = true)
    List<Object[]> findUpcomingTrainingSessionsByUser(@Param("id") Long id);

    @Modifying
    @Query(value="UPDATE TRAINING_SESSIONS SET deleted_at = CURRENT_TIMESTAMP where id = :id", nativeQuery = true)
    @Transactional
    void softDeleteById(@Param("id") Long id);
}
