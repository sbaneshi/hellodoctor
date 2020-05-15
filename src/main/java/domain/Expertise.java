package domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@Builder
@NoArgsConstructor
public class Expertise {

    @Id
    @GeneratedValue
    private int id;
    private String name;
}
