package yte.intern.personel.bilgi.yonetim.sistemi.experience.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "EXPERIENCE")
public class Experience extends BaseEntity {

    private String companyName;
    private String title;
    private String typeOfEmployment;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reasonForLeavingEmployment;


    @ManyToOne
    @JoinColumn(columnDefinition = "USER_ID")
    private User user;

    public Experience(String companyName, String title, String typeOfEmployment, LocalDate startDate, LocalDate endDate, String reasonForLeavingEmployment) {
        this.companyName = companyName;
        this.title = title;
        this.typeOfEmployment = typeOfEmployment;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reasonForLeavingEmployment = reasonForLeavingEmployment;
    }

    public void update(Experience experience) {
        this.companyName = experience.getCompanyName();
        this.title = experience.getTitle();
        this.typeOfEmployment = experience.getTypeOfEmployment();
        this.startDate = experience.getStartDate();
        this.endDate = experience.getEndDate();
        this.reasonForLeavingEmployment = experience.getReasonForLeavingEmployment();
    }
}
