package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import java.util.List;

public record PageResponseAdmin(

        List<UserResponseAdmin> users,
        Long totalRows

) {
}
