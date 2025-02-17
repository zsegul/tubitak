package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.Authority;

public record UserResponseAdmin(
        Long id,
        String fullName,
        String department, //birim
        String title, //unvan
        String task, //görev
        String email,
        String phone
){}
