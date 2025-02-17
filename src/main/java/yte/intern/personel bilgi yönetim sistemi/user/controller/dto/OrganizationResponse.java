package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;


import lombok.Builder;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.DirectorOfInstitution;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.Institution;

@Builder
public record OrganizationResponse(
    DirectorOfInstitution directorOfInstitution,
    Institution yte
    //List<UserResponseOrganization> userDetailsList
) {
}
