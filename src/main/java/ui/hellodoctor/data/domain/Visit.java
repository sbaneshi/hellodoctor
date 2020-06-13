package ui.hellodoctor.data.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
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
    @JsonIgnore
    private int id;

    @ManyToOne
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Doctor doctor;

    @ManyToOne
    @JsonInclude(JsonInclude.Include.NON_NULL)
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
