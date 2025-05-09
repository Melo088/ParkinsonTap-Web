package org.example.parkinsontapweb.controller;

import jakarta.annotation.PostConstruct;
import org.example.parkinsontapweb.entity.*;
import org.example.parkinsontapweb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TestConf {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private EvaluatedTypeRepository evaluatedTypeRepository;
    @Autowired
    private EvaluatedRepository evaluatedRepository;

    @PostConstruct
    public void init() {
        // Comprobar si ya existen datos
        if (evaluatedTypeRepository.count() <= 1) {
            return;
        }

        Evaluated evaluated = new Evaluated();
        evaluated.setEvaluatedType(evaluatedTypeRepository.getReferenceById(1));
        evaluated.setGenre(genreRepository.getReferenceById(502));
        evaluated.setName("Juan Camilo");

        evaluatedRepository.save(evaluated);

    }
}