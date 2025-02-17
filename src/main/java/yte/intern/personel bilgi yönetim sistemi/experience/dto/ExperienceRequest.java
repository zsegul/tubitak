package yte.intern.personel.bilgi.yonetim.sistemi.experience.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Builder;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.entity.Experience;

import java.time.LocalDate;

@Builder
public record ExperienceRequest(
        Long id,
        @NotBlank
        String companyName,
        @NotBlank
        String title,
        @NotBlank
        String typeOfEmployment,
        @Past
        LocalDate startDate,
        @Past
        LocalDate endDate,
        String reasonForLeavingEmployment
) {
        public Experience FromRequestToExperience() {
            return Experience.builder()
                        .id(this.id)
                        .companyName(this.companyName)
                        .title(this.title)
                        .typeOfEmployment(this.typeOfEmployment)
                        .startDate(this.startDate)
                        .endDate(this.endDate)
                        .reasonForLeavingEmployment(this.reasonForLeavingEmployment)
                        .build();
        }
}
