package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
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
    public Doctor login(@RequestParam String phoneNumber, @RequestParam String password) {
        return doctorService.login(phoneNumber, password);
    }

    @PostMapping("/signup/doctor")
    public Doctor signUp(@RequestParam String phoneNumber, @RequestParam String password, @RequestParam String expertise, @RequestParam String city, @RequestParam int maCode) {
        return doctorService.signUp(phoneNumber, password, expertise, city, maCode);
    }

    @PostMapping("/api/doctor/worktime")
    public WorkTime addWorkTime(@RequestParam int start24, @RequestParam int end24, @RequestParam DayOfWeek dayOfWeek) {
        assertRole(SecurityUtils.ROLE_DOCTOR);
        return doctorService.addWorkTime(getPhoneNumber(), start24, end24, dayOfWeek);
    }

    @DeleteMapping("/api/doctor/worktime")
    public ResponseEntity<?> deleteWorkTime(@RequestParam int id) {
        assertRole(SecurityUtils.ROLE_DOCTOR);
        doctorService.deleteWorkTime(getPhoneNumber(), id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/doctor/edit")
    public Doctor edit(@RequestParam @Nullable String firstName, @RequestParam @Nullable String lastName,
                       @RequestParam @Nullable String email, @RequestParam @Nullable String province,
                       @RequestParam @Nullable String city, @RequestParam @Nullable String address,
                       @RequestParam @Nullable Double geoX, @RequestParam @Nullable Double geoY,
                       @RequestParam @Nullable String expertise) {
        return doctorService.editDoctor(getPhoneNumber(), firstName, lastName, email, province, city, address, geoX, geoY, expertise);
    }
}
