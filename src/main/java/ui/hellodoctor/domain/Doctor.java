package ui.hellodoctor.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Doctor extends User {

    private int visitTime;
    private String address;
    private int MACode; //medical association Code
    private String workTime;
    private int visits;

}
