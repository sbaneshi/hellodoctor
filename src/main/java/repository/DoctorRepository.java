package repository;

import domain.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import domain.Expertise;
import domain.WorkTime;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Doctor getDoctor(Doctor doctor);
    List <Doctor> findDoctorsByExpertise(Expertise expertise);
    List <Doctor> findDoctorsByWorktime(WorkTime workTime);
}
