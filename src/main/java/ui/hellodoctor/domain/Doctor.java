package ui.hellodoctor.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Doctor extends User {

    private String address;

    private int MACode; //medical association Code

    @OneToMany(fetch = FetchType.LAZY)
    private List<WorkTime> workTime;

    @OneToMany
    private List<Visit> visits;

}
