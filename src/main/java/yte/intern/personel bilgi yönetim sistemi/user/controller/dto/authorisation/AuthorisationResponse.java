package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.authorisation;

import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserAuthoritiesResponseDTO;

import java.util.List;

public record AuthorisationResponse(
        List<UserAuthoritiesResponseDTO> userAuthoritiesResponseDTO,
        Long totalRows
) {
}
