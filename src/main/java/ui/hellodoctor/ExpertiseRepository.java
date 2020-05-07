package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpertiseRepository extends JpaRepository {
    public void add(Expertise Exp);
    public Expertise getByDoctor(Doctor Dr);
    public <Expertise>List getList(); // be nazarm lazem nabashe!!!!!!!!
}
