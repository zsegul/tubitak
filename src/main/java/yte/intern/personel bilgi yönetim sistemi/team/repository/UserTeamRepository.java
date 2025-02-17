package yte.intern.personel.bilgi.yonetim.sistemi.team.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.UserTeam;

import java.util.List;
import java.util.Set;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {

    @Query("select ut from UserTeam ut left join fetch ut.user u where u.id = :id")
    List<UserTeam> findUserTeamByUserId(@Param("id") Long id);

    Set<UserTeam> findByTeam(Team team);
}
