package org.example.parkinsontapweb.controller;

import jakarta.annotation.PostConstruct;
import org.example.parkinsontapweb.entity.*;
import org.example.parkinsontapweb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataAcquisitionConf {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private EvaluatedRepository evaluatedRepository;

    @Autowired
    private ReadingRepository readingRepository;

    @Autowired
    private EvaluatedTypeRepository evaluatedTypeRepository;

    @Autowired
    private GenreRepository genreRepository;

    @PostConstruct
    public void init() {
        // Comprobar si ya existen datos
        if (roleRepository.count() > 0) {
            return; // Si ya hay datos, no hacer nada
        }

        // Insertar Roles
        Role doctorRole = new Role();
        doctorRole.setRoleName("doctor");
        roleRepository.save(doctorRole);

        // Insertar Géneros
        Genre male = new Genre();
        male.setGenreName("Male");
        genreRepository.save(male);

        Genre female = new Genre();
        female.setGenreName("Female");
        genreRepository.save(female);

        // Insertar tipos de evaluados
        EvaluatedType evaluatedType = new EvaluatedType();
        evaluatedType.setTypeName("Type A");
        evaluatedTypeRepository.save(evaluatedType);

        // Insertar Evaluado
        Evaluated evaluated = new Evaluated();
        evaluated.setGenre(male);
        evaluated.setEvaluatedType(evaluatedType);
        evaluated.setName("John");
        evaluated.setWeight(70.5f);
        evaluated.setHeight(1.75f);
        evaluated.setBirthDate(LocalDate.of(1990, 5, 15));
        evaluated.setStatus(true);
        evaluatedRepository.save(evaluated);

        // Insertar Usuario (Doctor)
        User doctorUser = new User();
        doctorUser.setRole(doctorRole);
        doctorUser.setEmail("doctor@example.com");
        doctorUser.setLastName("Smith");
        doctorUser.setFirstName("John");
        doctorUser.setPassword("password");
        userRepository.save(doctorUser);

        // Crear Test
        Test test = new Test();
        test.setDoctor(doctorUser);
        test.setEvaluated(evaluated);
        test.setName("test1");
        test.setDateTime(LocalDateTime.now());
        test.setEvalAxis(true);
        test.setDescription("This is a test");
        testRepository.save(test);
    }
}