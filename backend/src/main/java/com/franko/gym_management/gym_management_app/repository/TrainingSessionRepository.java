package com.franko.gym_management.gym_management_app.repository;

import com.franko.gym_management.gym_management_app.model.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingSessionRepository extends JpaRepository<TrainingSession,Long> {

    List<TrainingSession> findAllByOrderByIdAsc();

    @Query(value = """

            SELECT
                ts.id AS session_id,
                tt.name AS training_type,
                ts.date AS session_date,
                COUNT(a.id) AS number_of_people,
                ARRAY_AGG(DISTINCT u.first_name || ' ' || u.last_name) AS trainers,
                tt.duration_in_minutes AS duration,
                tt.description
            FROM
                training_sessions ts
            JOIN
                training_types tt ON ts.training_type_id = tt.id
            LEFT JOIN
                attendances a ON ts.id = a.training_session_id
            LEFT JOIN
                training_sessions_trainers tst ON ts.id = tst.training_session_id
            LEFT JOIN
                trainers t ON tst.trainer_id = t.id
            LEFT JOIN
                users u ON t.user_id = u.id
            WHERE
                ts.date > NOW()
            GROUP BY
                ts.id, tt.name, ts.date, tt.duration_in_minutes, tt.description
            ORDER BY
                ts.date ASC
                    """, nativeQuery = true)
    List<Object[]> findUpcomingTrainingSessions();
}
