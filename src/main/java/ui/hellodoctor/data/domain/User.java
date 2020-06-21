package ui.hellodoctor.data.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Data
@SuperBuilder(toBuilder = true)
@MappedSuperclass
@NoArgsConstructor
public abstract class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;

    private String lastName;

    @JsonIgnore
    private String password;

    private String email;

    @Column(unique = true)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String phoneNumber;

    private String province;

    private String city;

    private String address;

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }
}
