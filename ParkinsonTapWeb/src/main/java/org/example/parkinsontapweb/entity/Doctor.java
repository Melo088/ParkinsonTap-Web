package org.example.parkinsontapweb.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctor extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    //Persist --- Merge
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Evaluated> evaluatedList;

    private String name;
    private String specialty;
    private String medicalCenter;
    private String email;
    private String password;

    @Override
    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Evaluated> getEvaluatedList() {
        return evaluatedList;
    }

    public void setEvaluatedList(List<Evaluated> evaluatedList) {
        this.evaluatedList = evaluatedList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }




}
