package yte.intern.personel.bilgi.yonetim.sistemi.experience.dto;

import lombok.Builder;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.entity.Experience;

import java.time.LocalDate;

@Builder
public record ExperienceResponse(
        Long id,
        String companyName,
        String title,
        String typeOfEmployment,
        LocalDate startDate,
        LocalDate endDate,
        String reasonForLeavingEmployment
) {
    public static ExperienceResponse fromExperienceToResponse(Experience experience) {
        return builder()
                .id(experience.getId())
                .companyName(experience.getCompanyName())
                .title(experience.getTitle())
                .typeOfEmployment(experience.getTypeOfEmployment())
                .startDate(experience.getStartDate())
                .endDate(experience.getEndDate())
                .reasonForLeavingEmployment(experience.getReasonForLeavingEmployment())
                .build();
    }
}
