package yte.intern.personel.bilgi.yonetim.sistemi.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.EducationRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.EducationResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.service.EducationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class EducationController {

    private final EducationService educationService;

    @GetMapping("{userId}/education")
    public List<EducationResponse> getEducations(@PathVariable Long userId) {
        return educationService.getEducations(userId);
    }

    @PostMapping("{userId}/education/add")
    public EducationResponse addEducation(@RequestBody @Valid EducationRequest educationRequest, @PathVariable Long userId){
        return educationService.addEducation(educationRequest, userId);
    }

    @PutMapping("{userId}/education/{educationId}/update")
    public EducationResponse updateEducation(
            @RequestBody @Valid EducationRequest educationRequest,
            @PathVariable Long userId,
            @PathVariable Long educationId
    )
    {
        return educationService.updateEducation(educationRequest, userId, educationId);
    }

    @DeleteMapping("{userId}/education/{educationId}/delete")
    public List<EducationResponse> deleteEducation(@PathVariable Long userId, @PathVariable Long educationId){
        return educationService.deleteEducation(userId, educationId);
    }

}