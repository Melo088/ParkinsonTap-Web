package org.example.parkinsontapweb.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "test")
public class Test {

    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "doctorId")
    private User doctor;

    @ManyToOne
    @JoinColumn (name = "evaluatedId")
    private Evaluated evaluated;

    private String name;
    private LocalDateTime dateTime;
    private Boolean evalAxis;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "test")
    private List <Reading> readings;


    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
