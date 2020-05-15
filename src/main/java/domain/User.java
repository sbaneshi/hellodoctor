package domain;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
public abstract class User {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String userName;
    private int phoneNumber;
    private String password;
    private String email;

}
