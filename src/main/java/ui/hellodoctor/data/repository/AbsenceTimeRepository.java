package ui.hellodoctor.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ui.hellodoctor.data.domain.AbsenceTime;

public interface AbsenceTimeRepository extends JpaRepository<AbsenceTime, Integer> {
}
