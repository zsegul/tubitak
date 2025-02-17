package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EducationResponse {
    private Long id;
    private String type;
    private String university;
    private String department;
    private LocalDate startDate;
    private LocalDate graduationDate;
    private String explanation;
}
