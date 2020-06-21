package ui.hellodoctor.data.repository;

import ui.hellodoctor.data.domain.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    Optional<Doctor> findByPhoneNumber(String phoneNumber);

    List<Doctor> findAllByExpertiseStartsWithAndCityStartsWith(String expertise, String city);
}
