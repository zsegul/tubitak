package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

public record UserResponse(
        Long id,
        String fullName,
        String department, //birim
        String title, //unvan
        String task, //görev
        String email,
        String phone
){}