package domain;

import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class Patient extends User{
    private int insuranceID;
}
