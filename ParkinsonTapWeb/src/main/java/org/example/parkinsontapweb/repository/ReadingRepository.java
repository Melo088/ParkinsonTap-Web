package org.example.parkinsontapweb.repository;

import org.example.parkinsontapweb.entity.Reading;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingRepository extends JpaRepository<Reading, Integer> {
}
