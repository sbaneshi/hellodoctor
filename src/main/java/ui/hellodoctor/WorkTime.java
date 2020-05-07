package ui.hellodoctor;

public class WorkTime {
    private int id;
    private int DrID;
    private int startTime;
    private int endTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDrID() {
        return DrID;
    }

    public void setDrID(int DrID) {
        this.DrID = DrID;
    }

    public int getStartTime() {
        return startTime;
    }

    public void setStartTime(int startTime) {
        this.startTime = startTime;
    }

    public int getEndTime() {
        return endTime;
    }

    public void setEndTime(int endTime) {
        this.endTime = endTime;
    }
}
