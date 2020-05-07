package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository {
    public void add(Doctor Dr);
    public Doctor getDoctor(Doctor Dr);
    public <List> Doctor getList();
    public <List> Doctor findDoctorsByExpertise(Expertise Exp);
    public <List> Doctor findDoctorsByWorktime(WorkTime W);
}
