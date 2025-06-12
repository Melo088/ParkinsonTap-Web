package org.example.parkinsontapweb.repository;

import org.example.parkinsontapweb.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByRoleName(String roleName);
    Optional<Role> findById(Long id);
}
