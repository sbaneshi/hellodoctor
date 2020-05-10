package ui.hellodoctor;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class  Doctor extends User{
    private int visitTime;
    private String address;
    @Id
    private int MACode; //medical association Code
    private String workTime;
    private int visits;


}
