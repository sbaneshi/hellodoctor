package ui.hellodoctor.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ui.hellodoctor.data.domain.Patient;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

    Optional<Patient> findByUsername(String username);
}
