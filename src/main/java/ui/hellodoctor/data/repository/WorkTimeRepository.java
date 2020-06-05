package ui.hellodoctor.data.repository;

import ui.hellodoctor.data.domain.WorkTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkTimeRepository extends JpaRepository<WorkTime, Integer> {

}
