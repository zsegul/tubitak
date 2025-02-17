package yte.intern.personel.bilgi.yonetim.sistemi.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.Education;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {

    List<Education> findByUserId(Long userId);

}
