package yte.intern.personel.bilgi.yonetim.sistemi.authority.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.controller.dto.AllAuthoritiesResponseDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.service.AuthorityService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/authority")
@RequiredArgsConstructor
public class AuthorityController {
    private final AuthorityService authorityService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<AllAuthoritiesResponseDTO>> getAllAuthorities() {
        return ResponseEntity.ok(authorityService.getAllAuthorities()
                .stream()
                .map(authority -> new AllAuthoritiesResponseDTO(authority.getAuthorityName()))
                .collect(Collectors.toList()));
    }
}
