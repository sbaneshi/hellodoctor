package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit,Integer> {
    Visit update(Visit visit);
    List<Visit> getByPatientId(Patient patient);
    List <Visit> getByDoctorId(int doctorId);
    List <Visit> getVisitsByWorkTime(int doctorId, WorkTime workTime);
}
