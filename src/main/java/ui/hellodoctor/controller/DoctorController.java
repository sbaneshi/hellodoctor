package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.data.domain.WorkTime;
import ui.hellodoctor.security.SecurityUtils;
import ui.hellodoctor.service.DoctorService;

import java.time.DayOfWeek;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class DoctorController extends BaseController {

    private final DoctorService doctorService;

    @GetMapping("/")
    public String index() {
        return "ajax.html";
    }

    @GetMapping("/api/doctor/full")
    public Doctor getFullDoctor() {
        assertRole(SecurityUtils.ROLE_DOCTOR);
        return doctorService.getFullDoctor(getPhoneNumber());
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/login/doctor")
    public Doctor login(String phoneNumber, String password) {
        return doctorService.login(phoneNumber, password);
    }

    @PostMapping("/signup/doctor")
    public Doctor signUp(String phoneNumber, String password, String expertise, int maCode) {
        return doctorService.signUp(phoneNumber, password, expertise, maCode);
    }

    @PostMapping("/api/doctor/worktime")
    public WorkTime addWorkTime(int start24, int end24, DayOfWeek dayOfWeek) {
        assertRole(SecurityUtils.ROLE_DOCTOR);
        return doctorService.addWorkTime(getPhoneNumber(), start24, end24, dayOfWeek);
    }

    @DeleteMapping("/api/doctor/worktime")
    public ResponseEntity<?> deleteWorkTime(int id) {
        assertRole(SecurityUtils.ROLE_DOCTOR);
        doctorService.deleteWorkTime(getPhoneNumber(), id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/doctor/edit")
    public Doctor edit(String firstName, String lastName, String email, String province,
                       String city, String address, Double geoX, Double geoY, String expertise) {
        return doctorService.editDoctor(getPhoneNumber(), firstName, lastName, email, province, city, address, geoX, geoY, expertise);
    }
}
