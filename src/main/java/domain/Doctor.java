package domain;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class  Doctor extends User {

    private int visitTime;
    private String address;
    @Id
    private int MACode; //medical association Code
    private String workTime;
    private int visits;


}
