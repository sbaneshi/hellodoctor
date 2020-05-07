/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DrSlm.DTO;

/**
 *
 * @author Four
 */
public class PatientDTO extends UserDTO {
    private int insuranceID;

    public int getInsuranceID() {
        return insuranceID;
    }

    public void setInsuranceID(int insuranceID) {
        this.insuranceID = insuranceID;
    }
    
    
}
