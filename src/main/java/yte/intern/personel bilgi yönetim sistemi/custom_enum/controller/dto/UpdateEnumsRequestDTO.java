package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateEnumsRequestDTO(
        @NotNull
        Long id,

        @NotBlank
        String value
) {
}
