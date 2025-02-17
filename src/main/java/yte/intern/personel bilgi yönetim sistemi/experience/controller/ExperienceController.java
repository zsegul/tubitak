package yte.intern.personel.bilgi.yonetim.sistemi.experience.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.service.ExperienceService;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.dto.ExperienceRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.dto.ExperienceResponse;

import java.util.List;

@RestController
@RequestMapping("/user/experience")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping("/{userId}")
    public List<ExperienceResponse> getExperiences(@PathVariable Long userId){
        return experienceService.getExperiences(userId).stream().map(ExperienceResponse::fromExperienceToResponse).toList();
    }

    @PostMapping("{userId}/add")
    public ExperienceResponse addExperience(@RequestBody @Valid ExperienceRequest experienceRequest, @PathVariable Long userId){
        return ExperienceResponse.fromExperienceToResponse(experienceService.addExperience(experienceRequest.FromRequestToExperience(), userId));
    }


    @PutMapping("/update")
    public ExperienceResponse updateExperience(@RequestBody @Valid ExperienceRequest experienceRequest)
    {
        return ExperienceResponse.fromExperienceToResponse(experienceService.updateExperience(experienceRequest.FromRequestToExperience()));
    };

    @DeleteMapping("/{userId}/delete/{experienceId}")
    public List<ExperienceResponse> deleteExperience(@PathVariable Long userId, @PathVariable Long experienceId){
        return experienceService.deleteExperience(userId, experienceId).stream().map(ExperienceResponse::fromExperienceToResponse).toList();
    }
}
