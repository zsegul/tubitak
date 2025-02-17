package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record CustomEnumDTO (
        @NotBlank
        String name
) {
}
