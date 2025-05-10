package org.example.parkinsontapweb.controller;

import org.example.parkinsontapweb.dto.TestDTO;
import org.example.parkinsontapweb.entity.Evaluated;
import org.example.parkinsontapweb.entity.Test;
import org.example.parkinsontapweb.repository.EvaluatedRepository;
import org.example.parkinsontapweb.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private EvaluatedRepository evaluatedRepository;

    @PostMapping("/save")
    public ResponseEntity<?> saveTest(@RequestBody TestDTO testDTO) {
        Map<String, Object> response = new HashMap<>();


        if (testDTO.evaluatedId == null || testDTO.name == null || testDTO.dateTime == null) {
            response.put("error", "Faltan campos obligatorios");
            return ResponseEntity.badRequest().body(response);
        }


        Evaluated evaluated = evaluatedRepository.findById(testDTO.evaluatedId).orElse(null);
        if (evaluated == null) {
            response.put("error", "El evaluado no existe");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        LocalDateTime parsedDate;

        try {
            parsedDate = LocalDateTime.parse(testDTO.dateTime);
        } catch (DateTimeParseException e) {
            try {
                // Try with formatter if direct parsing fails
                DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
                parsedDate = LocalDateTime.parse(testDTO.dateTime, formatter);
            } catch (Exception ex) {
                response.put("error", "Formato de fecha inválido.");
                return ResponseEntity.badRequest().body(response);
            }
        }

        try {
            Test test = new Test();
            test.setName(testDTO.name);
            test.setDescription(testDTO.description);
            test.setEvalAxis(testDTO.evalAxis);
            test.setDateTime(parsedDate);
            test.setEvaluated(evaluated);

            Test savedTest = testRepository.save(test);

            // Return success with the saved test ID
            response.put("message", "Test guardado con éxito");
            response.put("testId", savedTest.getId());
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.put("error", "Error al guardar el test: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}