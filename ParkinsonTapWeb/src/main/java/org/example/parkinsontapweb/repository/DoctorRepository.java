package org.example.parkinsontapweb.repository;

import org.example.parkinsontapweb.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

}
