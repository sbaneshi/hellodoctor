package ui.hellodoctor.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.DayOfWeek;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private DayOfWeek dayOfWeek;

    private int startHour24;

    private int endHour24;

}
