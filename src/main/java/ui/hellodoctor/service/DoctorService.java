package ui.hellodoctor.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ui.hellodoctor.VisitTimeCalculator;
import ui.hellodoctor.data.domain.*;
import ui.hellodoctor.data.repository.AbsenceTimeRepository;
import ui.hellodoctor.data.repository.DoctorRepository;
import ui.hellodoctor.data.repository.WorkTimeRepository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final WorkTimeRepository workTimeRepository;
    private final AbsenceTimeRepository absenceTimeRepository;

    public Doctor getFullDoctor(String phoneNumber) {
        Doctor doctor = doctorRepository.findByPhoneNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        return fullDoctor(doctor);
    }

    public Doctor getFullDoctor(int id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(IllegalArgumentException::new);
        return fullDoctor(doctor);
    }

    public List<Doctor> getDoctors(String expertise, String city) {
        return doctorRepository.findAllByExpertiseStartsWithAndCityStartsWith(expertise, city).stream()
                .map(d -> d.toBuilder()
                        .visits(null)
                        .phoneNumber(null)
                        .build())
                .collect(Collectors.toList());
    }

    public Doctor login(String phoneNumber, String password) {
        Doctor doctor = doctorRepository.findByPhoneNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        Assert.isTrue(User.PASSWORD_ENCODER.matches(password, doctor.getPassword()), "Wrong Credentials!");

        return doctor.toBuilder()
                .visits(null)
                .workTimes(null)
                .build();
    }

    public Doctor signUp(String phoneNumber, String password, String expertise, int maCode) {
        Doctor doctor = Doctor.builder()
                .phoneNumber(phoneNumber)
                .expertise(expertise)
                .maCode(maCode)
                .build();
        doctor.setPassword(password);

        return doctorRepository.save(doctor);
    }

    public WorkTime addWorkTime(String doctorPhoneNumber, int start24, int end24, DayOfWeek dayOfWeek) {
        WorkTime workTime = WorkTime.builder()
                .startHour24(start24)
                .endHour24(end24)
                .dayOfWeek(dayOfWeek)
                .build();
        workTime = workTimeRepository.save(workTime);

        Doctor doctor = doctorRepository.findByPhoneNumber(doctorPhoneNumber).orElseThrow(IllegalArgumentException::new);
        List<WorkTime> workTimes = doctor.getWorkTimes();
        workTimes.add(workTime);
        doctor.setWorkTimes(workTimes);
        doctorRepository.save(doctor);

        return workTime;
    }

    public void deleteWorkTime(String doctorPhoneNumber, int workTimeId) {
        Doctor doctor = doctorRepository.findByPhoneNumber(doctorPhoneNumber).orElseThrow(IllegalArgumentException::new);
        List<WorkTime> workTimes = doctor.getWorkTimes();
        workTimes = workTimes.stream().filter(workTime -> workTime.getId() != workTimeId).collect(Collectors.toList());
        doctor.setWorkTimes(workTimes);

        workTimeRepository.deleteById(workTimeId);
    }

    public Doctor editDoctor(String phoneNumber, String firstName, String lastName,
                             String email, String bio ,String province,
                             String city, String address,
                             Double geoX, Double geoY,
                             String expertise) {
        Doctor.DoctorBuilder<?, ?> builder = doctorRepository.findByPhoneNumber(phoneNumber).get().toBuilder();

        if (firstName != null)
            builder.firstName(firstName);
        if (lastName != null)
            builder.lastName(lastName);
        if (email != null)
            builder.email(email);
        if (bio != null)
            builder.bio(bio);
        if (province != null)
            builder.province(province);
        if (city != null)
            builder.city(city);
        if (address != null)
            builder.address(address);
        if (geoX != null)
            builder.geoX(geoX);
        if (geoY != null)
            builder.geoY(geoY);
        if (expertise != null)
            builder.expertise(expertise);

        return fullDoctor(doctorRepository.save(builder.build()));
    }

    public void addAbsence(String phoneNumber, long start, long end) {
        AbsenceTime absenceTime = absenceTimeRepository.save(AbsenceTime.builder()
                .start(start)
                .end(end)
                .build());

        Doctor doctor = doctorRepository.findByPhoneNumber(phoneNumber).orElseThrow(IllegalArgumentException::new);
        List<AbsenceTime> absenceTimes = doctor.getAbsences();
        absenceTimes.add(absenceTime);
        doctor.setAbsences(absenceTimes);
    }

    public List<Long> getAvailableVisitTimes(int doctorId, long startOfTime) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(IllegalArgumentException::new);

        List<AbsenceTime> absences = getUpdatedAbsences(doctor);
        List<Long> pendingVisits = doctor.getVisits().stream().map(Visit::getTime).collect(Collectors.toList());
        final long visitDuration = doctor.getVisitDurationMin() * 60000;

        return VisitTimeCalculator.calculate(doctor.getWorkTimes(),absences, pendingVisits, visitDuration, startOfTime);
    }

    private List<AbsenceTime> getUpdatedAbsences(Doctor doctor) {
        List<AbsenceTime> absences = doctor.getAbsences();
        absences = absences.stream().filter(a -> a.getEnd() > System.currentTimeMillis()).collect(Collectors.toList());
        doctor.setAbsences(absences);
        return doctorRepository.save(doctor).getAbsences();
    }

    private Doctor fullDoctor(Doctor doctor) {
        doctor.setVisits(doctor.getVisits().stream().peek(v -> {
            v.setDoctor(null);
            v.setPatient(v.getPatient().toBuilder()
                    .visits(null)
                    .phoneNumber(null)
                    .build());
        }).collect(Collectors.toList()));
        return doctor;
    }
}
