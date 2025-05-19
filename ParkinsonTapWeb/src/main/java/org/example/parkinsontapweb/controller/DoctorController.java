package org.example.parkinsontapweb.controller;

import org.example.parkinsontapweb.dto.LoginDTO;
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

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorRepository doctorRepository;
    private final EvaluatedRepository evaluatedRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Autowired
    public DoctorController(
            DoctorRepository doctorRepository,
            EvaluatedRepository evaluatedRepository,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository
    ) {
        this.doctorRepository = doctorRepository;
        this.evaluatedRepository = evaluatedRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }


    //Method to register doctors
    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(@RequestBody Doctor doctor) {
        if(doctorRepository.existsByEmail(doctor.getEmail())){
            return new ResponseEntity<>("Doctor already exists, try again", HttpStatus.BAD_REQUEST);
        }
        doctor.setPassword(passwordEncoder.hashPassword(doctor.getPassword()));
        Role role = roleRepository.findByRoleName("DOCTOR");
        doctor.setRole(role);
        doctorRepository.save(doctor);
        return new ResponseEntity<>("Doctor was registered successfully", HttpStatus.OK);
    }

    /*@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {

    }*/

}
