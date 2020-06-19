package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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
    public Patient login(@RequestParam String phoneNumber, @RequestParam String password) {
        return patientService.login(phoneNumber, password);
    }

    @PostMapping("/signup/patient")
    public Patient signUp(@RequestParam String phoneNumber, @RequestParam String password, @RequestParam String firstName, @RequestParam String lastName, @RequestParam int insuranceId) {
        return patientService.signUp(phoneNumber, password, firstName, lastName, insuranceId);
    }
}
