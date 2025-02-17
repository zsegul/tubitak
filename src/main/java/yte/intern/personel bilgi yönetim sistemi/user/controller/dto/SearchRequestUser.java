package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

public record SearchRequestUser(
        UserRequest userRequest,
        int page,
        int pageSize,
        boolean isSearched
) {
}
