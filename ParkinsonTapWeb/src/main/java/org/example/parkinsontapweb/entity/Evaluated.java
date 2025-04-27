package org.example.parkinsontapweb.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name = "evaluated")
public class Evaluated {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

   @ManyToOne
   @JoinColumn(name = "genreId")
   private Genre genre;

    @ManyToOne
    @JoinColumn(name = "evaluatedTypeId")
    private EvaluatedType evaluatedType;

    private String name;
    private Float weight;
    private Float height;
    private LocalDate birthDate;

    @Column(columnDefinition = "TEXT")
    private String notes;
    private Boolean status;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public EvaluatedType getEvaluatedType() {
        return evaluatedType;
    }

    public void setEvaluatedType(EvaluatedType evaluatedType) {
        this.evaluatedType = evaluatedType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
