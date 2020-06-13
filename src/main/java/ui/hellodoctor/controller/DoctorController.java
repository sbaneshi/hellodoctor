package ui.hellodoctor.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.service.DoctorService;

@RestController
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/api/doctor/full")
    public Doctor getFullDoctor(@RequestParam int id) {
        return doctorService.getFullDoctor(id);
    }
}
