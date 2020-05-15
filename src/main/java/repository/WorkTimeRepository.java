package repository;

import domain.WorkTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkTimeRepository extends JpaRepository<WorkTime, Integer> {

}
