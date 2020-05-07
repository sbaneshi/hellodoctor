package ui.hellodoctor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Expertise {

    @Id
    private int id;
    private String name;
}
