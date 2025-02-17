package yte.intern.personel.bilgi.yonetim.sistemi.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.OrganizationResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.*;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final InstitutionRepository institutionRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final DirectorOfInstitutionRepository directorOfInstitutionRepository;


    public OrganizationResponse getOrganization() {

        return OrganizationResponse.builder()
                .directorOfInstitution(directorOfInstitutionRepository
                        .findById(1L)
                        .orElseThrow())
                .yte(institutionRepository.findById(1L).orElseThrow()).build();
    }
}
