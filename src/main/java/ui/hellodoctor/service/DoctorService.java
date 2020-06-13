package ui.hellodoctor.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.data.domain.User;
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

    public Doctor login(String phoneNumber, String password) {
        Doctor doctor = doctorRepository.findByPhoneNumber(phoneNumber).orElseThrow(() ->
                new IllegalArgumentException("No doctor found with phoneNumber=" + phoneNumber));
        Assert.isTrue(User.PASSWORD_ENCODER.matches(password, doctor.getPassword()), "Wrong Credentials!");

        return doctor.toBuilder()
                .visits(null)
                .workTimes(null)
                .build();
    }

    public Doctor signUp( String phoneNumber,  String password,  String expertise,  int maCode) {
        Doctor doctor = Doctor.builder()
                .phoneNumber(phoneNumber)
                .expertise(expertise)
                .maCode(maCode)
                .build();
        doctor.setPassword(password);

        return doctorRepository.save(doctor);
    }
}
