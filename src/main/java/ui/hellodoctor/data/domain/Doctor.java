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

    private String address;

    private int MACode; //medical association Code

    private String expertise;

    @OneToMany(fetch = FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<WorkTime> workTimes;

    @OneToMany
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Visit> visits;

}
