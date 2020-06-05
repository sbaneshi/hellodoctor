package ui.hellodoctor.data.repository;

import ui.hellodoctor.data.domain.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

}
