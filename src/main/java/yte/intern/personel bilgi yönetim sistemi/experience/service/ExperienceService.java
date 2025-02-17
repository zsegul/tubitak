package yte.intern.personel.bilgi.yonetim.sistemi.experience.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.entity.Experience;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.repository.ExperienceRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.service.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final UserService userService;
    private final ExperienceRepository experienceRepository;

    @Transactional
    public List<Experience> getExperiences(Long userId) {
        return experienceRepository.findByUserId(userId);
    }

    public Experience addExperience(Experience experience, Long userId) {

        User user = userService.getUserById(userId);

        experience.setUser(user);

        user.addNewExperience(experience);

        return experienceRepository.save(experience);
    }

    public List<Experience> deleteExperience(Long userId, Long experienceId) {
        experienceRepository.deleteById(experienceId);
        return getExperiences(userId);
    }

    @Transactional
    public Experience updateExperience(Experience experience) {
        Experience experienceDB = experienceRepository.findById(experience.getId()).orElseThrow();

        experienceDB.update(experience);
        return experienceRepository.save(experienceDB);

    }
}