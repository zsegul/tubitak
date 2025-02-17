package yte.intern.personel.bilgi.yonetim.sistemi.user;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository.CustomEnumRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.*;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AddOrganization {

    private final OrganizationRepository organizationRepository;
    private final BoardOfDirectorsRepository boardOfDirectorsRepository;
    private final PresidentRepository presidentRepository;
    private final InstitutionRepository institutionRepository;
    private final DirectorOfInstitutionRepository directorOfInstitutionRepository;
    private final UserRepository userRepository;
    private final CustomEnumRepository customEnumRepository;

    @PostConstruct
    public void init() {





        /*
        Institution institution3 = new Institution("Software Development Technologies", new HashSet<>(), null);
        Institution institution = new Institution("Software Development",  new HashSet<>(), null);
        Institution institution2 = new Institution("Project Management", new HashSet<>(), null);

        //institution3.addChildInstitution(institution);
        //institution3.addChildInstitution(institution2);

        institutionRepository.save(institution3);

        DirectorOfInstitution directorOfInstitution = new DirectorOfInstitution("Director of Software Development");
        directorOfInstitutionRepository.save(directorOfInstitution);

        President president = new President("President of Bilgem");
        presidentRepository.save(president);
        president.setDirectorOfInstitution(directorOfInstitution);
        directorOfInstitution.setPresident(president);
        presidentRepository.save(president);
        directorOfInstitutionRepository.save(directorOfInstitution);

        BoardOfDirectors boardOfDirectors = new BoardOfDirectors("Board of Directors of Bilgem");
        boardOfDirectors.setPresident(president);
        boardOfDirectorsRepository.save(boardOfDirectors);
        president.setBoardOfDirectors(boardOfDirectors);
        presidentRepository.save(president);

        Organization organization = new Organization("YTE");
        organizationRepository.save(organization);
        organization.setPresident(president);
        organization.setBoardOfDirectors(boardOfDirectors);
        organization.setInstitutions(Set.of(institution, institution2, institution3));
        organization.setDirectorOfInstitution(directorOfInstitution);
        organizationRepository.save(organization);

    */
    }

}