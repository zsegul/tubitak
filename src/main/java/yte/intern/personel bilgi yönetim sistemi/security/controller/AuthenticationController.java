package yte.intern.personel.bilgi.yonetim.sistemi.security.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.personel.bilgi.yonetim.sistemi.security.controller.dto.LoginRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.security.controller.dto.LoginResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.security.service.AuthenticationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/logout")
    public void logout() {
        authenticationService.logout();
    }
}