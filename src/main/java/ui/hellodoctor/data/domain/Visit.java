package ui.hellodoctor.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Doctor doctor;

    @ManyToOne
    private Patient patient;

    private long time;

    private State state;


    public enum State {
        PENDING,
        DOCTOR_ABSENCE,
        PATIENT_ABSENCE,
        DONE,
        ;
    }
}
