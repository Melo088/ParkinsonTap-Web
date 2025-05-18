package org.example.parkinsontapweb.controller;

import org.example.parkinsontapweb.entity.Doctor;
import org.example.parkinsontapweb.entity.Role;
import org.example.parkinsontapweb.repository.DoctorRepository;
import org.example.parkinsontapweb.repository.EvaluatedRepository;
import org.example.parkinsontapweb.repository.RoleRepository;
import org.example.parkinsontapweb.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private EvaluatedRepository evaluatedRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    //Method to register doctors
    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(@RequestBody Doctor doctor) {
        if(doctorRepository.findByEmail(doctor.getEmail()) != null){
            return new ResponseEntity<>("Doctor already exists, try again", HttpStatus.BAD_REQUEST);
        }
        doctor.setPassword(passwordEncoder.hashPassword(doctor.getPassword()));
        Role role = roleRepository.findByRoleName("DOCTOR");
        doctor.setRole(role);
        doctorRepository.save(doctor);

        return new ResponseEntity<>("Doctor was registered successfully", HttpStatus.OK);
    }
}
