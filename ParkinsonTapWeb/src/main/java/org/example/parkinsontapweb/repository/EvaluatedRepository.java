package org.example.parkinsontapweb.repository;

import org.example.parkinsontapweb.entity.Evaluated;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvaluatedRepository extends JpaRepository<Evaluated, Integer> {

    List<Evaluated> findByNameContainingIgnoreCase(String name);
}
