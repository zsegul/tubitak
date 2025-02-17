package yte.intern.personel.bilgi.yonetim.sistemi.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
