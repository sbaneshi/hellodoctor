package repository;

import domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Integer> {

}
