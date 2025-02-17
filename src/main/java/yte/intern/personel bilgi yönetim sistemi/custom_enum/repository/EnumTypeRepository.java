package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.EnumType;

@Repository
public interface EnumTypeRepository extends JpaRepository<EnumType, Long> {
    EnumType findByName(String name);
}
