package ui.hellodoctor.repository;

import ui.hellodoctor.domain.WorkTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkTimeRepository extends JpaRepository<WorkTime, Integer> {

}
