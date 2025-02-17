package yte.intern.personel.bilgi.yonetim.sistemi.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "EDUCATION")
public class Education extends BaseEntity {

    private String type;
    private String university;

    private String department;
    private LocalDate startDate;
    private LocalDate graduationDate;
    private String explanation;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    public Education(String type, String university, String department, LocalDate startDate, LocalDate graduationDate, String explanation) {
        this.type = type;
        this.university = university;
        this.department = department;
        this.startDate = startDate;
        this.graduationDate = graduationDate;
        this.explanation = explanation;
    }
}
