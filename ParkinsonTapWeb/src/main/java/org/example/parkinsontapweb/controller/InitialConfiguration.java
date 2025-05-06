package org.example.parkinsontapweb.controller;

import jakarta.annotation.PostConstruct;
import org.example.parkinsontapweb.entity.*;
import org.example.parkinsontapweb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InitialConfiguration {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private EvaluatedTypeRepository evaluatedTypeRepository;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init() {
        // Comprobar si ya existen datos
        if (roleRepository.count() > 0) {
            return; // Si ya hay datos, no hacer nada
        }

        // Insertar Roles
        Role adminRole = new Role();
        adminRole.setRoleName("ADMIN");
        roleRepository.save(adminRole);

        Role doctorRole = new Role();
        doctorRole.setRoleName("DOCTOR");
        roleRepository.save(doctorRole);

        // Insertar Géneros
        Genre masculino = new Genre();
        masculino.setGenreName("MASCULINO");
        genreRepository.save(masculino);

        Genre femenino = new Genre();
        femenino.setGenreName("FEMENINO");
        genreRepository.save(femenino);

        Genre otro = new Genre();
        otro.setGenreName("OTRO");
        genreRepository.save(otro);

        // Insertar tipos de evaluados
        EvaluatedType pacientes = new EvaluatedType();
        pacientes.setTypeName("PACIENTES");
        evaluatedTypeRepository.save(pacientes);

        EvaluatedType controles = new EvaluatedType();
        controles.setTypeName("CONTROLES");
        evaluatedTypeRepository.save(controles);


    }
}