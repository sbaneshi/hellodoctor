package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ui.hellodoctor.data.domain.Patient;
import ui.hellodoctor.security.SecurityUtils;
import ui.hellodoctor.service.PatientService;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class PatientController extends BaseController {

    private final PatientService patientService;

    @GetMapping("/api/patient/full")
    public Patient getFullPatient() {
        assertRole(SecurityUtils.ROLE_PATIENT);
        return patientService.getFullPatient(getPhoneNumber());
    }

    @PostMapping("/login/patient")
    public Patient login(String phoneNumber, String password) {
        return patientService.login(phoneNumber, password);
    }

    @PostMapping("/signup/patient")
    public Patient signUp(String phoneNumber, String password, String firstName, String lastName, int insuranceId) {
        return patientService.signUp(phoneNumber, password, firstName, lastName, insuranceId);
    }

    @PostMapping("/api/patient/edit")
    public Patient edit(String firstName, String lastName, String email, String province, String city, String address) {
        assertRole(SecurityUtils.ROLE_PATIENT);
        return patientService.editPatient(getPhoneNumber(), firstName, lastName, email, province, city, address);
    }
}
