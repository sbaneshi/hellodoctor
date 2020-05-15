package repository;

import domain.Expertise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpertiseRepository extends JpaRepository<Expertise, Integer> {

}
