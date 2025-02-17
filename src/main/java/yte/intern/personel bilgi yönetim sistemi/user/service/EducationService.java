package yte.intern.personel.bilgi.yonetim.sistemi.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.EducationRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.EducationResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.Education;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.EducationRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;
    private final UserRepository userRepository;

    @Transactional
    public List<EducationResponse> getEducations(Long userId) {
        List<Education> educations = educationRepository.findByUserId(userId);
        List<EducationResponse> educationResponseList = new ArrayList<>();

        educations.forEach(e -> {
            EducationResponse educationResponse = new EducationResponse(
                    e.getId(),
                    e.getType(),
                    e.getUniversity(),
                    e.getDepartment(),
                    e.getStartDate(),
                    e.getGraduationDate(),
                    e.getExplanation()
            );
            educationResponseList.add(educationResponse);
        });
        return educationResponseList;
    }

    public EducationResponse addEducation(EducationRequest educationRequest, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();

        Education education = new Education(
                educationRequest.getType(),
                educationRequest.getUniversity(),
                educationRequest.getDepartment(),
                educationRequest.getStartDate(),
                educationRequest.getGraduationDate(),
                educationRequest.getExplanation(),
                user
        );
        educationRepository.save(education);

        return new EducationResponse(
                education.getId(),
                education.getType(),
                education.getUniversity(),
                education.getDepartment(),
                education.getStartDate(),
                education.getGraduationDate(),
                education.getExplanation()
        );
    }

    public EducationResponse updateEducation(EducationRequest educationRequest, Long userId, Long educationId) {
        User user = userRepository.findById(userId).orElseThrow();
        Education education = educationRepository.findById(educationId).orElseThrow();

        education.setUser(user);
        education.setType(educationRequest.getType());
        education.setUniversity(educationRequest.getUniversity());
        education.setDepartment(educationRequest.getDepartment());
        education.setStartDate(educationRequest.getStartDate());
        education.setGraduationDate(educationRequest.getGraduationDate());
        education.setExplanation(educationRequest.getExplanation());
        educationRepository.save(education);

        return new EducationResponse(
                education.getId(),
                education.getType(),
                education.getUniversity(),
                education.getDepartment(),
                education.getStartDate(),
                education.getGraduationDate(),
                education.getExplanation()
        );
    }

    public List<EducationResponse> deleteEducation(Long userId, Long educationId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.removeEducation(educationRepository.findById(educationId).orElseThrow());
        educationRepository.deleteById(educationId);
        List<Education> educations = educationRepository.findByUserId(userId);
        List<EducationResponse> educationResponseList = new ArrayList<>();

        educations.forEach(e -> {
            EducationResponse educationResponse = new EducationResponse(
                    e.getId(),
                    e.getType(),
                    e.getUniversity(),
                    e.getDepartment(),
                    e.getStartDate(),
                    e.getGraduationDate(),
                    e.getExplanation()
            );
            educationResponseList.add(educationResponse);
        });
        return educationResponseList;
    }
}
