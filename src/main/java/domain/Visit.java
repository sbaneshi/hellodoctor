package domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@Builder
@NoArgsConstructor
public class Visit {

    @Id
    @GeneratedValue
    private int id;
    private int drId;
    private int patientId;
    private String time;

}
