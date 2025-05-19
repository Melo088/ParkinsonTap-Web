package org.example.parkinsontapweb.repository;

import org.example.parkinsontapweb.entity.Doctor;
import org.example.parkinsontapweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Boolean existsByEmail(String email);

}
