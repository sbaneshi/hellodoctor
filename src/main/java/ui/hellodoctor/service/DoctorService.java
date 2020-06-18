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

    public Doctor getFullDoctor(String phoneNumber) {
        Doctor doctor = doctorRepository.findByPhoneNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        doctor.setVisits(doctor.getVisits().stream().peek(v -> {
            v.setDoctor(null);
            v.setPatient(v.getPatient().toBuilder()
                    .visits(null)
                    .phoneNumber(null)
                    .build());
        }).collect(Collectors.toList()));
        return doctor;
    }

    public Doctor login(String phoneNumber, String password) {
        Doctor doctor = doctorRepository.findByPhoneNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        Assert.isTrue(User.PASSWORD_ENCODER.matches(password, doctor.getPassword()), "Wrong Credentials!");

        return doctor.toBuilder()
                .visits(null)
                .workTimes(null)
                .build();
    }

    public Doctor signUp(String phoneNumber, String password, String city, String expertise, int maCode) {
        Doctor doctor = Doctor.builder()
                .phoneNumber(phoneNumber)
                .city(city)
                .expertise(expertise)
                .maCode(maCode)
                .build();
        doctor.setPassword(password);

        return doctorRepository.save(doctor);
    }
}
