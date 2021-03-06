package ui.hellodoctor.data.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(toBuilder = true)
@ToString(callSuper = true)
@NoArgsConstructor
public class Doctor extends User {

    private double geoX;

    private double geoY;

    private int maCode; //medical association Code

    private String expertise;

    private String bio;

    @OneToMany(fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<WorkTime> workTimes;

    @OneToMany
    private List<AbsenceTime> absences;

    @OneToMany
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Visit> visits;

    private int visitDurationMin;

}
