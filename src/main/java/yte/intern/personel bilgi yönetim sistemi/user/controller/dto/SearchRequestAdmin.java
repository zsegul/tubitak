package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

public record SearchRequestAdmin(
        UserRequest userRequest,
        int page,
        int pageSize,
        boolean isSearched
) {
}
