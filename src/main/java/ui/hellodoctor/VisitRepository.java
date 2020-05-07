package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository {
    public void add(Visit visit);
    public Visit update(Visit visit);
    public Visit delete(Visit visit);
    public List<Visit> getByPatientId(Patient patient);
    public Visit getById(int id);
    public List <Visit> getByDoctorId(int doctor_id);
    public List <Visit> getVisitsByWorkTime(int dotor_id, WorkTime work_time);
}
