package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import java.util.List;

public record PageResponseUser(

        List<UserResponseUser> users,
        Long totalRows

) {
}
