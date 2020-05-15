package ui.hellodoctor.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
@SuperBuilder
@NoArgsConstructor
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
