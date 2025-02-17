package yte.intern.personel.bilgi.yonetim.sistemi.contribution.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity.Contribution;

import java.util.List;
import java.util.Set;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {

    @Query("select c from Contribution c left join fetch c.user u where u.id = :id")
    List<Contribution> findAllByUserId(@Param("id") Long id);

    @Query("SELECT DISTINCT c.eventType FROM Contribution c")
    List<String> findDistinctEventTypes();

    Set<Contribution> findByEventType(String eventType);
}
