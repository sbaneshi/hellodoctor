package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository {
    public void add(Patient patient, Insurance insurance);
    public Patient delete(Patient user);
    public Patient update(Patient patient);
    public Patient getPatient(Patient user);
}
