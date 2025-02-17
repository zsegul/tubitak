package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;


public record UserRequest(
        Long id,
        String fullName,
        String department,
        String title,
        String task,
        String project,
        String contribution,
        String team
) { }
