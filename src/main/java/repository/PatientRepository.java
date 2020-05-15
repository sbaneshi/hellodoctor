package repository;

import domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Integer> {
    Patient update(Patient patient);
    Patient getPatient(Patient patient);

}
