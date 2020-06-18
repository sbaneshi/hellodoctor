package ui.hellodoctor.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ui.hellodoctor.data.domain.Patient;
import ui.hellodoctor.data.domain.User;
import ui.hellodoctor.data.repository.PatientRepository;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public Patient getFullPatient(String phoneNumber) {
        Patient patient = patientRepository.findByPhoneNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        patient.setVisits(patient.getVisits().stream().peek(visit -> {
            visit.setPatient(null);
            visit.setDoctor(visit.getDoctor().toBuilder()
                    .visits(null)
                    .phoneNumber(null)
                    .workTimes(null)
                    .build());
        }).collect(Collectors.toList()));

        return patient;
    }

    public Patient login(String phoneNumber, String password) {
        Patient patient = patientRepository.findByPhoneNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        Assert.isTrue(User.PASSWORD_ENCODER.matches(password, patient.getPassword()), "Wrong credentials!");

        return patient.toBuilder()
                .visits(null)
                .build();
    }

    public Patient signUp(String phoneNumber, String password, int insuranceId) {
        Patient patient = Patient.builder()
                .phoneNumber(phoneNumber)
                .insuranceId(insuranceId)
                .build();
        patient.setPassword(password);

        return patientRepository.save(patient);
    }
}
