package yte.intern.personel.bilgi.yonetim.sistemi.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PROJECT")
public class Project extends BaseEntity {

    private String projectName;

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Team> teams = new HashSet<>();

    public void addTeam(Team team) {
        teams.add(team);
    }
}
