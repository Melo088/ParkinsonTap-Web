package org.example.parkinsontapweb.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@DiscriminatorValue("DOCTOR")
public class Doctor extends User{
    private String specialty;
    private String medicalCenter;

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
