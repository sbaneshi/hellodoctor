package ui.hellodoctor.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.data.repository.DoctorRepository;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public Doctor getFullDoctor(int id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("No doctor found with id=" + id));
        doctor.setVisits(doctor.getVisits().stream().peek(v -> {
            v.setDoctor(null);
            v.setPatient(v.getPatient().toBuilder()
                    .visits(null)
                    .build());
        }).collect(Collectors.toList()));
        return doctor;
    }
}
