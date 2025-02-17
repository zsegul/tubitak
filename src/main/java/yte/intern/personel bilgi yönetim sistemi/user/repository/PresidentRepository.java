package yte.intern.personel.bilgi.yonetim.sistemi.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.President;

public interface PresidentRepository extends JpaRepository<President, Long> {
}
