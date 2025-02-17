package yte.intern.personel.bilgi.yonetim.sistemi.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.*;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.authorisation.AuthorisationRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.authorisation.AuthorisationResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.service.UserService;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserAuthoritiesResponseDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserRoleUpdateRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserTeamResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile.ProfileRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile.ProfileResponse;

import java.io.IOException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/auth=admin")
    public PageResponseAdmin getUsersAdmin(@RequestBody SearchRequestAdmin searchRequestAdmin) {
        return userService.searchUsersAdmin(searchRequestAdmin);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/auth=user")
    public PageResponseUser getUsersUser(@RequestBody SearchRequestUser searchRequestUser) {
        return userService.searchUsersUser(searchRequestUser);
    }

    @GetMapping("/rehber/{id}")
    public RehberKisaResponse getRehberKisa(@PathVariable Long id) {
        return userService.getRehberKisa(id);
    }

    @GetMapping("/getProfile")
    public ProfileResponse getUserInfoForProfile(@RequestParam("userId") Long userId) {
        return userService.getInfos(userId);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> createUser(@RequestBody @Valid CreateUserRequestDTO createUserRequestDTO) throws IOException {
        return ResponseEntity.ok(userService.createUser(createUserRequestDTO));
    }

    @GetMapping("/authorities")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserAuthoritiesResponseDTO> getUsersWithAuthorities() {
        return userService.userToUserAuthoritiesDTO(userService.getAllUsers());
    }

    @PutMapping("/authorities")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserAuthoritiesResponseDTO> updateUserRoles(@RequestBody @Valid List <UserRoleUpdateRequestDTO> userRoleUpdateRequestDTO) {
        return userService.userToUserAuthoritiesDTO(userService.updateUserRoles(userRoleUpdateRequestDTO));
    }

    @PostMapping("/authorities")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public AuthorisationResponse getUsersPageWithAuthorities(@RequestBody AuthorisationRequest authorisationRequest) {
        return userService.getUsersForAuthorizationByPage(authorisationRequest);
    }

    @GetMapping("/{id}/projects")
    public List<UserTeamResponse> getUserTeams(@PathVariable Long id) {
        return userService.getUserTeams(id);
    }



    @PutMapping("/updateProfile")
    public ProfileResponse updateProfile(@RequestBody ProfileRequest profileRequest) {
        return userService.updateUserProfile(profileRequest);
    }

    @PostMapping("/uploadAvatar")
    public ResponseEntity<Map<String, String>> uploadAvatar(@RequestParam("avatar") MultipartFile file,
                                                            @RequestParam("userId") Long userId) throws IOException {
        Map<String, String> response = new HashMap<>();
        String base64Image = userService.uploadAvatar(file, userId);
        response.put("avatar", base64Image);

        return ResponseEntity.ok().body(response);
    }
}

