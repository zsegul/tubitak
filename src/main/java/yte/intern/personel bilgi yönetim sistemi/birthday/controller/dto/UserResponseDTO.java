package yte.intern.personel.bilgi.yonetim.sistemi.birthday.controller.dto;

import lombok.Builder;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.time.LocalDate;

@Builder
public record UserResponseDTO(
        String fullName,
        LocalDate birthDate,
        byte[] image
) {

    public static UserResponseDTO from(User user) {
        return builder()
                .fullName(user.getFullName())
                .birthDate(user.getBirthDate())
                .image(user.getImage())
                .build();
    }

}
