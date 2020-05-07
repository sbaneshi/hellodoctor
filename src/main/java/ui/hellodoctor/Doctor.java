package ui.hellodoctor;

import javax.persistence.Entity;

@Entity
public class Doctor extends User{
    private int visitTime;
    private String address;
    private int MACode; //medical association Code
    private String workTime;
    private int visits;

    public int getVisitTime() {
        return visitTime;
    }

    public void setVisitTime(int visitTime) {
        this.visitTime = visitTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getMACode() {
        return MACode;
    }

    public void setMACode(int MACode) {
        this.MACode = MACode;
    }

    public String getWorkTime() {
        return workTime;
    }

    public void setWorkTime(String workTime) {
        this.workTime = workTime;
    }

    public int getVisits() {
        return visits;
    }

    public void setVisits(int visits) {
        this.visits = visits;
    }
}
