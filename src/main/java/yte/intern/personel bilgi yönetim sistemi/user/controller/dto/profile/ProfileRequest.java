package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile;

public record ProfileRequest(
    Long userId,
    UserInformation userInformation,
    CompInformation compInformation
    ){}

