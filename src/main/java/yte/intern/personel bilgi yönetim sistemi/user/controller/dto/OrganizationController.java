package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.personel.bilgi.yonetim.sistemi.user.service.OrganizationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class OrganizationController {

    private final OrganizationService organizationService;

    @GetMapping("/organization")
    public OrganizationResponse getOrganization(){
        return organizationService.getOrganization();
    }
}
