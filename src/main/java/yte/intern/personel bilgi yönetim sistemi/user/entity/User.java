package yte.intern.personel.bilgi.yonetim.sistemi.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.Authority;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity.Contribution;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.entity.Experience;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.UserTeam;

import java.time.LocalDate;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "USERS")
@SuperBuilder
public class User extends CustomUser implements UserDetails {

    private String name;
    private String surname;
    private String fullName;
    private String email;
    private String gender;
    private String TCKimlikNo;
    private String academicTitle;
    private LocalDate birthDate;
    private String bloodType;
    private String phone;
    private String plateNo;
    private String emergencyContact;
    private String emergencyContactPhone;
    private String address;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    @JsonIgnore
    private List<Education> educations = new ArrayList<>();

    private byte[] image;

    //kurumsal bilgiler
    private LocalDate dateOfStart; //işe giriş tarihi
    private String recordNo; //sicil no

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "staff_id")
    private CustomEnum staff; //kadro

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "title_id")
    private CustomEnum title; //unvan

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private CustomEnum department; //birim

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projectInWork_id")
    private CustomEnum projectInWork; //çalışılan proje

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_id")
    private CustomEnum task; //görev

//    private String institutionalSurname; //kurumsal soyadı

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "staffType_id")
    private CustomEnum staffType; //personel türü

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "typeOfWork_id")
    private CustomEnum typeOfWork; // çalışma türü

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "workStatus_id")
    private CustomEnum workStatus; //çalışma durumu

    private String mentor; //mentor
    private String serviceUsage; //servis kullanımı
    private String internalNumber; //dahili numara
    private String roomNo; //oda numara

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "institution_id")
    private Institution institutionOrgSch;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "department_entity_id")
    private Department departmentOrgSch;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnore
    @Builder.Default
    private Set<UserTeam> userTeams = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    @Builder.Default
    @JsonIgnore
    private Set<Experience> experiences = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    @JsonIgnore
    private Set<FileDetails> files = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    @JsonIgnore
    private Set<Contribution> contributions = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_team_join",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @Builder.Default
    @JsonIgnore
    private Set<Team> teams = new HashSet<>();

    public User(String username, String password, List<Authority> authorities) {
        super.setUsername(username);
        super.setPassword(password);
        super.setAuthorities(authorities);
        educations = new ArrayList<>();
        files = new HashSet<>();
        contributions = new HashSet<>();
        experiences = new HashSet<>();
        teams = new HashSet<>();
        userTeams = new HashSet<>();
    }

    public void addTeams(Team team) {
        teams.add(team);
    }

    public void removeTeams(Team team) {
        teams.remove(team);
    }

    public void addEducation(Education education){
        this.educations.add(education);
        education.setUser(this);
    }

    public void addFile(FileDetails file) {
        files.add(file);
    }

    public void addContribution(Contribution contribution) {
        contributions.add(contribution);
    }
    public void addExperiences(Experience experience) {
        experiences.add(experience);
    }

    public void addNewExperience(Experience experience) {
        this.experiences.add(experience);
    }


    public void removeContribution(Contribution contribution) {
        contributions.remove(contribution);
    }

    public void removeFile(FileDetails file) {
        files.remove(file);
    }

    public void removeEducation(Education education) {
        educations.remove(education);
    }

    public void addAuthority(Authority authority) {
//        if (super.getAuthorities() == null || super.getAuthorities().isEmpty()) {
//            super.setAuthorities(new ArrayList<>());
//        }
        super.getAuthorities().add(authority);
    }
}