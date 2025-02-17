package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile;

import org.springframework.http.ResponseEntity;

import java.util.Collection;

public record ProfileResponse(
        ResponseEntity<String> avatar,
        UserInformation userInformation,
        CompInformation compInformation
) {
}



