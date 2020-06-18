package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.security.SecurityUtils;
import ui.hellodoctor.service.DoctorService;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class DoctorController extends BaseController {

    private final DoctorService doctorService;

    @GetMapping("/api/doctor/full")
    public Doctor getFullDoctor() {
        assertRole(SecurityUtils.ROLE_DOCTOR);
        return doctorService.getFullDoctor(getPhoneNumber());
    }

    @PostMapping("/login/doctor")
    public Doctor login(@RequestParam String phoneNumber, @RequestParam String password) {
        return doctorService.login(phoneNumber, password);
    }

    @PostMapping("/signup/doctor")
    public Doctor signUp(@RequestParam String phoneNumber, @RequestParam String password, @RequestParam String expertise, @RequestParam String city, @RequestParam int maCode) {
        return doctorService.signUp(phoneNumber, password, expertise, city, maCode);
    }


}
