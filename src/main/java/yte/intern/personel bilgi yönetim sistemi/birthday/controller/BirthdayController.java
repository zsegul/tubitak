package yte.intern.personel.bilgi.yonetim.sistemi.birthday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.personel.bilgi.yonetim.sistemi.birthday.controller.dto.UserResponseDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.birthday.service.BirthdayService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/birthday")
public class BirthdayController {

    private final BirthdayService birthdayService;

    @GetMapping("/todays-birthdays")
    public List<UserResponseDTO> getBirthdays() {
        return birthdayService.getBirthdays().stream().map(UserResponseDTO::from).toList();
    }
}
