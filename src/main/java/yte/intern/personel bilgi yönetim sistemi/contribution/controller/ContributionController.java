package yte.intern.personel.bilgi.yonetim.sistemi.contribution.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto.ContributionRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto.ContributionResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.service.ContributionService;

import java.io.IOException;
import java.rmi.NoSuchObjectException;
import java.util.List;

@RestController
@RequestMapping("/contribution")
public class ContributionController {

    private final ContributionService contributionService;

    @Autowired
    public ContributionController(ContributionService contributionService) {
        this.contributionService = contributionService;
    }

    @GetMapping("/eventTypes")
    public List<String> getEventTypes() {
        return contributionService.getEventTypes();
    }

    @PostMapping("/upload/{id}")
    public ContributionResponse uploadContribution(@ModelAttribute @Valid ContributionRequest contributionRequest, @PathVariable Long id) throws IOException {
        return contributionService.saveContribution(contributionRequest, id);
    }

    @PutMapping("/update/{id}")
    public List<ContributionResponse> updateContribution(@ModelAttribute @Valid ContributionRequest contributionRequest, @PathVariable Long id) throws IOException {
        return contributionService.updateContribution(contributionRequest, id);
    }

    @GetMapping("/allContributions/{id}")
    public List<ContributionResponse> getAllContributions(@PathVariable Long id) throws NoSuchObjectException {
        return contributionService.getAllContributions(id);
    }

    @DeleteMapping("/delete/{id}")
    public List<ContributionResponse> deleteContribution(@PathVariable Long id) throws NoSuchObjectException {
        return contributionService.deleteContribution(id);
    }
}
