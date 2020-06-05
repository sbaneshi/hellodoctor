package ui.hellodoctor.data.repository;

import ui.hellodoctor.data.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Integer> {

}
