package ui.hellodoctor;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import ui.hellodoctor.data.domain.Doctor;
import ui.hellodoctor.data.domain.Patient;
import ui.hellodoctor.data.domain.Visit;
import ui.hellodoctor.data.domain.WorkTime;
import ui.hellodoctor.data.repository.DoctorRepository;
import ui.hellodoctor.data.repository.PatientRepository;
import ui.hellodoctor.data.repository.VisitRepository;
import ui.hellodoctor.data.repository.WorkTimeRepository;

import java.time.DayOfWeek;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DummyDataProvider implements ApplicationContextAware {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final VisitRepository visitRepository;
    private final WorkTimeRepository workTimeRepository;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if (doctorRepository.existsById(1)) return;

        WorkTime w1 = WorkTime.builder()
                .dayOfWeek(DayOfWeek.SATURDAY)
                .startHour24(12)
                .endHour24(14)
                .build();

        WorkTime w2 = WorkTime.builder()
                .dayOfWeek(DayOfWeek.THURSDAY)
                .startHour24(16)
                .endHour24(18)
                .build();

        WorkTime w3 = WorkTime.builder()
                .dayOfWeek(DayOfWeek.WEDNESDAY)
                .startHour24(10)
                .endHour24(12)
                .build();

        WorkTime w4 = WorkTime.builder()
                .dayOfWeek(DayOfWeek.TUESDAY)
                .startHour24(11)
                .endHour24(13)
                .build();

        w1 = workTimeRepository.save(w1);
        w2 = workTimeRepository.save(w2);
        w3 = workTimeRepository.save(w3);
        w4 = workTimeRepository.save(w4);

        Doctor d1 = Doctor.builder()
                .phoneNumber("1234")
                .expertise("a")
                .workTimes(Arrays.asList(w1, w2))
                .build();
        d1.setPassword("1234");

        Doctor d2 = Doctor.builder()
                .phoneNumber("5678")
                .expertise("b")
                .workTimes(Arrays.asList(w3, w4))
                .build();
        d2.setPassword("1234");

        d1 = doctorRepository.save(d1);
        d2 = doctorRepository.save(d2);

        Patient p1 = Patient.builder()
                .phoneNumber("4321")
                .build();
        p1.setPassword("1234");

        Patient p2 = Patient.builder()
                .phoneNumber("8765")
                .build();
        p2.setPassword("1234");

        p1 = patientRepository.save(p1);
        p2 = patientRepository.save(p2);

        Visit v1 = Visit.builder()
                .doctor(d1)
                .patient(p1)
                .state(Visit.State.PATIENT_ABSENCE)
                .time(System.currentTimeMillis())
                .build();

        Visit v2 = Visit.builder()
                .doctor(d1)
                .patient(p2)
                .build();

        Visit v3 = Visit.builder()
                .doctor(d2)
                .patient(p2)
                .build();

        v1 = visitRepository.save(v1);
        v2 = visitRepository.save(v2);
        v3 = visitRepository.save(v3);

        doctorRepository.saveAll(Arrays.asList(
                d1.toBuilder()
                        .visits(Arrays.asList(v1, v2))
                        .build(),
                d2.toBuilder()
                        .visits(Arrays.asList(v3))
                        .build()));

        patientRepository.saveAll(Arrays.asList(
                p1.toBuilder()
                        .visits(Arrays.asList(v1))
                        .build(),
                p2.toBuilder()
                        .visits(Arrays.asList(v2, v3))
                        .build()));
    }
}
