package yte.intern.personel.bilgi.yonetim.sistemi.security.controller.dto;
import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(
        @NotEmpty
        String username,
        @NotEmpty
        String password
) {
}