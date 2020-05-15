package ui.hellodoctor;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class WorkTime {

    private int id;
    @Id
    private int drId;
    private int startTime;
    private int endTime;
}
