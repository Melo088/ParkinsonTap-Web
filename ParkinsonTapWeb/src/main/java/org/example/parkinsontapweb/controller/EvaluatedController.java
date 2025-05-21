package org.example.parkinsontapweb.controller;

import org.example.parkinsontapweb.dto.EvaluatedDTO;
import org.example.parkinsontapweb.entity.Evaluated;
import org.example.parkinsontapweb.mapper.EvaluatedMapper;
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
    public List<EvaluatedDTO> listAll() {

        List<Evaluated> evaluatedList = evaluatedRepository.findAll();
        return EvaluatedMapper.toDTOList(evaluatedList);
    }

    @GetMapping("/search")
    public List<Evaluated> searchByName(@RequestParam String name) {
        return evaluatedRepository.findByNameContainingIgnoreCase(name);
    }

    @PreAuthorize("hasAuthority('DOCTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvaluated(@PathVariable Integer id) {
        if (!evaluatedRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        evaluatedRepository.deleteById(id);
        return ResponseEntity.ok("Evaluado eliminado con éxito");
    }


}
