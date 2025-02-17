package yte.intern.personel.bilgi.yonetim.sistemi.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.Institution;

import java.util.List;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    List<Institution> findByParentInstitutionIsNotNull();

}
