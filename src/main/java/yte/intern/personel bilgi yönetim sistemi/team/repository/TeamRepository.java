package yte.intern.personel.bilgi.yonetim.sistemi.team.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByTeamName(String teamName);

    @Query("SELECT DISTINCT t.teamName FROM Team t")
    List<String> findDistinctTeamNames();

    @Query("SELECT t FROM Team t WHERE t.project.projectName = :projectName")
    List<Team> findAllByProjectName(@Param("projectName") String projectName);
}
