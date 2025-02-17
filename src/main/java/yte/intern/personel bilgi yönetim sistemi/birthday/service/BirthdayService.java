package yte.intern.personel.bilgi.yonetim.sistemi.birthday.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BirthdayService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<User> getBirthdays() {
        LocalDate today = LocalDate.now();
        return userRepository.findUsersWithBirthdaysInMonth(today.getMonthValue());
    }
}
