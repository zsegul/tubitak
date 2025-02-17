package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import java.util.List;

public record UserAuthoritiesResponseDTO (Long id, String name, String surname, List<String> authorities) {
}
