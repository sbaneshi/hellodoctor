package domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Visit {
    @Id
    private int id;
    private int drId;
    private int patientId;
    private String time;

}
