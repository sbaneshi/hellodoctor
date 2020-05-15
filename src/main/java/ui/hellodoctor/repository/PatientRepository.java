package ui.hellodoctor.repository;

import ui.hellodoctor.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
