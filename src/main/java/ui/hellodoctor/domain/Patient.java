package ui.hellodoctor.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Patient extends User {

    private int insuranceID;

}
