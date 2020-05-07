package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkTimeRepository extends JpaRepository {
    public void add(WorkTime workTime);
    public void delete(WorkTime workTime);
    public List<WorkTime> findWorktimesByDoctor(Doctor Dr);
}
