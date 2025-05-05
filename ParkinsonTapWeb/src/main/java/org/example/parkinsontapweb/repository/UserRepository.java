package org.example.parkinsontapweb.repository;

import org.example.parkinsontapweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
