package yte.intern.personel.bilgi.yonetim.sistemi.experience.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.entity.Experience;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

   List<Experience> findByUserId(Long userId);

}
