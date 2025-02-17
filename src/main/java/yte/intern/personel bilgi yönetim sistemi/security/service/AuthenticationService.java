package yte.intern.personel.bilgi.yonetim.sistemi.security.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.Authority;
import yte.intern.personel.bilgi.yonetim.sistemi.security.controller.dto.LoginRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.security.controller.dto.LoginResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password());

        Authentication authenticatedAuthentication;
        authenticatedAuthentication = authenticationManager.authenticate(token);

        if (authenticatedAuthentication.isAuthenticated()) {

            SecurityContext newContext = SecurityContextHolder.createEmptyContext();
            newContext.setAuthentication(authenticatedAuthentication);
            SecurityContextHolder.setContext(newContext);
            saveContext();

            User user = (User) authenticatedAuthentication.getPrincipal();

            List<String> returnAuthority = user.getAuthorities().stream().map(Authority::getAuthorityName).toList();
            return new LoginResponse(user.getName(),user.getSurname(),user.getId(), returnAuthority);
        }
        return null;
    }

    public void logout() {
        SecurityContextHolder.clearContext();
        saveContext();
    }

    private void saveContext() {
        if (RequestContextHolder.getRequestAttributes() != null) {
            var request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            var response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
            securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
        }
    }
}
