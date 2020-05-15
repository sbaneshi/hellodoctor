package ui.hellodoctor;

import lombok.Data;

import javax.annotation.security.DenyAll;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class User {
    @Id
    private int id;
    private String name;
    private String userName;
    private int phoneNumber;
    private String password;
    private String email;

}
