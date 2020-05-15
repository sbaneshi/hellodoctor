package ui.hellodoctor.repository;

import ui.hellodoctor.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Integer> {

}
