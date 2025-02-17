package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserRoleUpdateRequestDTO (

        @NotNull
        Long userId,

        @NotNull
        List<String> roles
) {
}
