package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record EnumTypeWithEnumsDTO (
        @NotBlank
        String enumTypeName,

        @NotBlank
        List<CustomEnumDTO> customEnums
) {
}