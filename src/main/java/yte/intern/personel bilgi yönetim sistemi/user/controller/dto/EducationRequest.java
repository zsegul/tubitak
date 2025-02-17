package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EducationRequest {
    @NotBlank
    private String type;
    @NotBlank
    private String university;
    @NotBlank
    private String department;
    @Past(message = "Geçmiş bir tarih olmalı")
    private LocalDate startDate;
    @PastOrPresent
    private LocalDate graduationDate;
    private String explanation;
}
