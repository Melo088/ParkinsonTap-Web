package org.example.parkinsontapweb.controller;

import org.example.parkinsontapweb.entity.Evaluated;
import org.example.parkinsontapweb.repository.EvaluatedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/evaluated")
@RestController
public class EvaluatedController {
    @Autowired
    private EvaluatedRepository evaluatedRepository;


    @PreAuthorize("hasAuthority('DOCTOR')")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Evaluated evaluated) {
        evaluatedRepository.save(evaluated);
        return ResponseEntity.ok().body("Evaluado creado");


    }



    @GetMapping("/data")
    public List<Evaluated> listAll() {
        return evaluatedRepository.findAll();
    }

    @GetMapping("/search")
    public List<Evaluated> searchByName(@RequestParam String name) {
        return evaluatedRepository.findByNameContainingIgnoreCase(name);
    }

}
