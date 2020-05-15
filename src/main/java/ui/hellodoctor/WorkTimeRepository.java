package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkTimeRepository extends JpaRepository<WorkTime,Integer> {
    List<WorkTime> findWorktimesByDoctor(Doctor Dr);
}
