package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateEnumTypeRequestDTO(

        @NotBlank
        String name
) {
}
