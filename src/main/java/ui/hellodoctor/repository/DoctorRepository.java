package ui.hellodoctor.repository;

import ui.hellodoctor.domain.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

}
