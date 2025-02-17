package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.authorisation;

public record AuthorisationRequest(
        String fullName,
        int page,
        int pageSize,
        boolean isSearched

) {
}
