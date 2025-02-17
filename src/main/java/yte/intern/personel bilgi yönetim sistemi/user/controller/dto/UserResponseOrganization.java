package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import lombok.Builder;

@Builder
public record UserResponseOrganization(
        String fullName,
        String departmentName,
        String institutionName
) {
}
