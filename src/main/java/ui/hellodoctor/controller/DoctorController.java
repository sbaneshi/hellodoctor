package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.service.DoctorService;
@CrossOrigin
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class DoctorController {


    private final DoctorService doctorService;

    @GetMapping("/")
    public String index() {
        return "ajax.html";
    }


    @GetMapping("/api/doctor/full")
    public Doctor getFullDoctor(@RequestParam int id) {
        return doctorService.getFullDoctor(id);
    }
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/login/doctor")
    public Doctor login(@RequestParam String phoneNumber, @RequestParam String password) {
        return doctorService.login(phoneNumber, password);
    }

    @PostMapping("/signup/doctor")
    public Doctor signUp(@RequestParam String phoneNumber, @RequestParam String password, @RequestParam String expertise, @RequestParam int maCode) {
        return doctorService.signUp(phoneNumber, password, expertise, maCode);
    }
}
