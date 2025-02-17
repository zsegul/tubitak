package yte.intern.personel.bilgi.yonetim.sistemi.team.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;
import yte.intern.personel.bilgi.yonetim.sistemi.project.entity.Project;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TEAM")
public class Team extends BaseEntity {

    private String teamName;

    @ManyToOne
    @JsonIgnore
    private Project project;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<UserTeam> userTeams = new HashSet<>();

    @ManyToMany(mappedBy = "teams")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public void addUser(User user) {
        this.users.add(user);
    }
}
