package yte.intern.personel.bilgi.yonetim.sistemi.authority.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.Authority;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.RoleName;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Optional<Authority> findByAuthority(RoleName authority);

}
