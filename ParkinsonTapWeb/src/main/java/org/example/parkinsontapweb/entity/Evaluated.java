package org.example.parkinsontapweb.entity;

import jakarta.persistence.*;
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
}
