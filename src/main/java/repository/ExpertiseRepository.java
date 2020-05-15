package repository;

import domain.Expertise;
import domain.worktime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpertiseRepository extends JpaRepository<Expertise,Integer> {
    Expertise getByDoctor(worktime.Doctor Dr);
}
