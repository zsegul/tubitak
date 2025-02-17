package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import java.util.List;

public record PageResponse(

        List<UserResponse> users,
        Long totalRows

) {
}
