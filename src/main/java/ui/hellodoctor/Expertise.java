package ui.hellodoctor;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Expertise {

    @Id
    private int id;
    private String name;
}
