package org.example.parkinsontapweb.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@DiscriminatorValue("DOCTOR")
public class Doctor extends User{

    //Persist --- Merge
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Evaluated> evaluatedList;

    private String specialty;
    private String medicalCenter;

    public List<Evaluated> getEvaluatedList() {
        return evaluatedList;
    }

    public void setEvaluatedList(List<Evaluated> evaluatedList) {
        this.evaluatedList = evaluatedList;
    }


    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getMedicalCenter() {
        return medicalCenter;
    }

    public void setMedicalCenter(String medicalCenter) {
        this.medicalCenter = medicalCenter;
    }


}
