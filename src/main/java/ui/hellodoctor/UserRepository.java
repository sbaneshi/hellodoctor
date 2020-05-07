package ui.hellodoctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository {
    public void add(User user);
    public User getUser (User user);
    public List<User> getList();
}
