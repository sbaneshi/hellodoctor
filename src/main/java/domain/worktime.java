package domain;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@Data
public class worktime {
    @Id
    @GeneratedValue
    private int id;
    @NonNull
    private int DrID;
    private int startTime;
    private int endTime;





}
