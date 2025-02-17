package yte.intern.personel.bilgi.yonetim.sistemi.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;

@Getter
@Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@SuperBuilder
public class BoardOfDirectors extends BaseEntity {
    private String name;

//    @OneToOne
//    @JoinColumn(name = "organization_id")
//    private Organization organization;

    @OneToOne
    @JoinColumn(name = "president_id")
    private President president;

    public BoardOfDirectors(String name) {
        this.name = name;
    }
}
