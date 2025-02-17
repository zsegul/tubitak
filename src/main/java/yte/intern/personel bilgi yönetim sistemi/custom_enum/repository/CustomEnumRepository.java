package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomEnumRepository extends JpaRepository<CustomEnum, Long> {
    List<CustomEnum> findByEnumTypeName(String name);

    CustomEnum findByNameAndEnumTypeName(String name, String typeName);
}