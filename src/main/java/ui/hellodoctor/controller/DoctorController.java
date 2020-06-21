package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.data.domain.WorkTime;
import ui.hellodoctor.security.SecurityUtils;
import ui.hellodoctor.service.DoctorService;

import java.time.DayOfWeek;
import java.util.List;

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

    @GetMapping("/doctor/full_by_id")
    public Doctor getFullDoctorById(int id) {
        return doctorService.getFullDoctor(id);
    }

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors(String expertise, String city) {
        return doctorService.getDoctors(
                StringUtils.hasText(expertise) ? expertise : "",
                StringUtils.hasText(city) ? city : ""
        );
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

    @PostMapping("/api/doctor/absence/add")
    public ResponseEntity<?> addAbsence(long start, long end) {
        assertRole(SecurityUtils.ROLE_DOCTOR);
        doctorService.addAbsence(getPhoneNumber(), start, end);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/doctor/available_visit_times")
    public List<Long> getAvailableVisitTime(int id) {
        return doctorService.getAvailableVisitTimes(id, System.currentTimeMillis());
    }
}
