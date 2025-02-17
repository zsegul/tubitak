package yte.intern.personel.bilgi.yonetim.sistemi.user.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@SuperBuilder
public class Organization extends BaseEntity {
    private String name;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "board_of_directors_id", referencedColumnName = "id")
//    private BoardOfDirectors boardOfDirectors;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "president_id", referencedColumnName = "id")
//    private President president;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "organization_id")
    private Set<Institution> institutions = new HashSet<>();

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "director_of_institution_id", referencedColumnName = "id")
//    private DirectorOfInstitution directorOfInstitution;
//

}
