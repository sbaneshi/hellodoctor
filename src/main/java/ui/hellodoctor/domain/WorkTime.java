package ui.hellodoctor.domain;

import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class WorkTime {

    @Id
    @GeneratedValue
    private int id;
    private int drId;
    private int startTime;
    private int endTime;

}
