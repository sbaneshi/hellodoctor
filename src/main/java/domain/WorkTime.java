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
public class WorkTime {

    @Id
    @GeneratedValue
    private int id;
    private int drId;
    private int startTime;
    private int endTime;
}
