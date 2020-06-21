package ui.hellodoctor.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ui.hellodoctor.data.domain.Patient;
import ui.hellodoctor.data.domain.User;
import ui.hellodoctor.data.domain.Visit;
import ui.hellodoctor.data.repository.PatientRepository;
import ui.hellodoctor.data.repository.VisitRepository;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final VisitRepository visitRepository;

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

    public Patient signUp(String phoneNumber, String password, String firsName, String lastName, int insuranceId) {
        Patient patient = Patient.builder()
                .phoneNumber(phoneNumber)
                .firstName(firsName)
                .lastName(lastName)/**/
                .insuranceId(insuranceId)
                .build();
        patient.setPassword(password);

        return patientRepository.save(patient);
    }

    public Patient editPatient(@NonNull String phoneNumber, String firstName, String lastName, String email, String province,
                               String city, String address) {
        Patient.PatientBuilder<?,?> builder = patientRepository.findByPhoneNumber(phoneNumber).get().toBuilder();

        if (firstName != null)
            builder.firstName(firstName);
        if (lastName != null)
            builder.lastName(lastName);
        if (email != null)
            builder.email(email);
        if (province != null)
            builder.province(province);
        if (city != null)
            builder.city(city);
        if (address != null)
            builder.address(address);

        patientRepository.save(builder.build());
        return getFullPatient(phoneNumber);
    }

    public void cancelVisit(String phoneNumber, int visitId) {
        Visit visit = visitRepository.findById(visitId).orElseThrow(IllegalArgumentException::new);
        visit.setState(Visit.State.CANCELED);
    }
}
