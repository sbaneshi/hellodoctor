package ui.hellodoctor;

import javax.persistence.Entity;

@Entity
public class Patient extends User{
    private int insuranceID;

    public int getInsuranceID() {
        return insuranceID;
    }

    public void setInsuranceID(int insuranceID) {
        this.insuranceID = insuranceID;
    }
}
