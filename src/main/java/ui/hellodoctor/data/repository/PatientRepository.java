package ui.hellodoctor.data.repository;

import ui.hellodoctor.data.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
