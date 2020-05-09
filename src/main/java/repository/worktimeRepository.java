package repository;
import domain.worktime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface worktimeRepository extends JpaRepository<worktime,Integer> {
}
