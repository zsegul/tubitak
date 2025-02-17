package yte.intern.personel.bilgi.yonetim.sistemi.security.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.Authority;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.RoleName;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.repository.AuthorityRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity.Contribution;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.repository.ContributionRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.EnumType;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository.CustomEnumRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository.EnumTypeRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.entity.Experience;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.repository.ExperienceRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.file.repository.FileRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.project.entity.Project;
import yte.intern.personel.bilgi.yonetim.sistemi.project.repository.ProjectRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.UserTeam;
import yte.intern.personel.bilgi.yonetim.sistemi.team.repository.TeamRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.team.repository.UserTeamRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.*;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.DirectorOfInstitutionRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.InstitutionRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.OrganizationRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;

import java.time.LocalDate;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Configuration
@RequiredArgsConstructor
public class UserPopulator {

    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomEnumRepository customEnumRepository;
    private final EnumTypeRepository enumTypeRepository;
    private final ProjectRepository projectRepository;
    private final TeamRepository teamRepository;
    private final FileRepository fileRepository;
    private final ContributionRepository contributionRepository;
    private final UserTeamRepository userTeamRepository;
    private final ExperienceRepository experienceRepository;
    private final OrganizationRepository organizationRepository;
    private final InstitutionRepository institutionRepository;
    private final DirectorOfInstitutionRepository directorOfInstitutionRepository;

    @Transactional
    public void initUsers() {

        Organization bilgemOrganization = Organization.builder().name("BİLGEM").build();
        organizationRepository.save(bilgemOrganization);

        Institution yteInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("YTE")
                .build();

        Institution pmoInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("PMO")
                .parentInstitution(yteInstitution)
                .build();

        Institution businessDevelopmentAndContractManagementInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Business Development and Contract Management")
                .parentInstitution(yteInstitution)
                .build();

        Institution facilityManagementInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Facility Management")
                .parentInstitution(yteInstitution)
                .build();

        Institution productizationAndProductManagementInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Productization and Product Management")
                .parentInstitution(yteInstitution)
                .build();

        Institution softwareDevelopmentTechnologiesAfoInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Software Development Technologies AFO")
                .parentInstitution(yteInstitution)
                .build();

        Institution digitalTransformationSolutionsAfoInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Digital Transformation Solutions AFO")
                .parentInstitution(yteInstitution)
                .build();

        Institution instituteBoardInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Institute Board")
                .parentInstitution(yteInstitution)
                .build();

        Institution enterpriseResourceManagementInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Enterprise Resource Management")
                .parentInstitution(yteInstitution)
                .build();

        Institution qualityAndStrategyManagementInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Quality and Strategy Management")
                .parentInstitution(yteInstitution)
                .build();

        Institution technologyUnionCoordinationInstitution = Institution.builder()
                .organization(bilgemOrganization)
                .name("Technology Union Coordination")
                .parentInstitution(yteInstitution)
                .build();


        yteInstitution.addChildInstitution(pmoInstitution);
        yteInstitution.addChildInstitution(businessDevelopmentAndContractManagementInstitution);
        yteInstitution.addChildInstitution(facilityManagementInstitution);
        yteInstitution.addChildInstitution(productizationAndProductManagementInstitution);
        yteInstitution.addChildInstitution(softwareDevelopmentTechnologiesAfoInstitution);
        yteInstitution.addChildInstitution(digitalTransformationSolutionsAfoInstitution);
        yteInstitution.addChildInstitution(instituteBoardInstitution);
        yteInstitution.addChildInstitution(enterpriseResourceManagementInstitution);
        yteInstitution.addChildInstitution(qualityAndStrategyManagementInstitution);
        yteInstitution.addChildInstitution(technologyUnionCoordinationInstitution);


        Department purchaseDepartment = Department.builder().name("Purchase Department").build();
        Department humanResourcesDepartment = Department.builder().name("Human Resources Department").build();
        Department educationAndOrganizationDepartment = Department.builder().name("Education And Organization Department").build();

        enterpriseResourceManagementInstitution.addDepartment(purchaseDepartment);
        enterpriseResourceManagementInstitution.addDepartment(humanResourcesDepartment);
        enterpriseResourceManagementInstitution.addDepartment(educationAndOrganizationDepartment);

        Department projectManagementOfSoftwareDepartment = Department.builder().name("Project Management Department").build();
        Department softwareArchitectureAndInfrastructureDepartment = Department.builder().name("Software Architecture and Infrastructure Management").build();
        Department softwareDevelopmentDepartment = Department.builder().name("Software Development Management").build();
        Department openSourceSoftwareTechnologiesDepartment = Department.builder().name("Open Source Software Technologies").build();

        softwareDevelopmentTechnologiesAfoInstitution.addDepartment(projectManagementOfSoftwareDepartment);
        softwareDevelopmentTechnologiesAfoInstitution.addDepartment(softwareArchitectureAndInfrastructureDepartment);
        softwareDevelopmentTechnologiesAfoInstitution.addDepartment(softwareDevelopmentDepartment);
        softwareDevelopmentTechnologiesAfoInstitution.addDepartment(openSourceSoftwareTechnologiesDepartment);

        Department projectManagementOfDigitalDepartment = Department.builder().name("Project Management Department").build();
        Department digitalStrategyAndTransformationPlanningDepartment = Department.builder().name("Digital Strategy and Transformation Planning").build();
        Department informationScienceDepartment = Department.builder().name("Information Science").build();
        Department requirementsEngineeringAndUserExperienceDepartment = Department.builder().name("Requirements Engineering and User Experience").build();

        digitalTransformationSolutionsAfoInstitution.addDepartment(projectManagementOfDigitalDepartment);
        digitalTransformationSolutionsAfoInstitution.addDepartment(digitalStrategyAndTransformationPlanningDepartment);
        digitalTransformationSolutionsAfoInstitution.addDepartment(informationScienceDepartment);
        digitalTransformationSolutionsAfoInstitution.addDepartment(requirementsEngineeringAndUserExperienceDepartment);

        institutionRepository.saveAll(List.of(
                yteInstitution,
                pmoInstitution,
                businessDevelopmentAndContractManagementInstitution,
                facilityManagementInstitution,
                productizationAndProductManagementInstitution,
                softwareDevelopmentTechnologiesAfoInstitution,
                digitalTransformationSolutionsAfoInstitution,
                instituteBoardInstitution,
                enterpriseResourceManagementInstitution,
                qualityAndStrategyManagementInstitution,
                technologyUnionCoordinationInstitution
        ));

        DirectorOfInstitution directorOfInstitution = DirectorOfInstitution.builder().name("Erkan DİLAVEROĞLU").build();
        directorOfInstitutionRepository.save(directorOfInstitution);

        EnumType birim_type = new EnumType("Birim", "Genel");
        EnumType unvan_type = new EnumType("Unvan", "Genel");
        EnumType personelTürü_type = new EnumType("Personel Türü", "Genel");
        EnumType akademikUnvan_type = new EnumType("Akademik Unvan", "Genel");
        EnumType kadro_type = new EnumType("Kadro", "Genel");
        EnumType çalışılanProje_type = new EnumType("Çalışılan Proje", "Genel");
        EnumType çalışmaTürü_type = new EnumType("Çalışma Türü", "Genel");
        EnumType çalışmaDurumu_type = new EnumType("Çalışma Durumu", "Genel");
        EnumType görev_type = new EnumType("Görev", "Genel");
        EnumType servisKullanımı_type = new EnumType("Servis Kullanımı", "Genel");

        EnumType egitimTürü_type = new EnumType("Eğitim Türü", "Eğitim");
        EnumType universite_type = new EnumType("Üniversite/Okul", "Eğitim");
        EnumType bolum_type = new EnumType("Bölüm", "Eğitim");

        EnumType etkinlikTürü_type = new EnumType("Etkinlik Türü", "Katkılar");

        EnumType dosyaTürü_type = new EnumType("Dosya Türü", "Dosya");
        EnumType dosyaAdı_type = new EnumType("Dosya Adı", "Dosya");
        EnumType yüklemeTarihi_type = new EnumType("Yükleme Tarihi", "Dosya");

        enumTypeRepository.saveAll(List.of(birim_type, unvan_type, personelTürü_type, akademikUnvan_type, kadro_type,
                çalışılanProje_type, çalışmaTürü_type, çalışmaDurumu_type, görev_type, servisKullanımı_type, egitimTürü_type,
                universite_type, bolum_type, etkinlikTürü_type, dosyaTürü_type, dosyaAdı_type, yüklemeTarihi_type));

        CustomEnum customEnum0 = new CustomEnum("Yönetim", birim_type);
        CustomEnum customEnum1 = new CustomEnum("Akademik", birim_type);
        CustomEnum customEnum2 = new CustomEnum("İdari", birim_type);

        CustomEnum customEnum3 = new CustomEnum("Araştırmacı", unvan_type);
        CustomEnum customEnum4 = new CustomEnum("Uzman Araştırmacı", unvan_type);
        CustomEnum customEnum5 = new CustomEnum("Yazılım Geliştirici", unvan_type);

        CustomEnum customEnum6 = new CustomEnum("Öğrenci", personelTürü_type);
        CustomEnum customEnum7 = new CustomEnum("Akademik Personel", personelTürü_type);
        CustomEnum customEnum8 = new CustomEnum("İdari Personel", personelTürü_type);

        CustomEnum customEnum9 = new CustomEnum("Prof. Dr.", akademikUnvan_type);
        CustomEnum customEnum10 = new CustomEnum("Doç. Dr.", akademikUnvan_type);
        CustomEnum customEnum11 = new CustomEnum("Dr. Öğr. Üyesi", akademikUnvan_type);

        CustomEnum customEnum12 = new CustomEnum("Akademik", kadro_type);
        CustomEnum customEnum13 = new CustomEnum("İdari", kadro_type);
        CustomEnum customEnum14 = new CustomEnum("Destek", kadro_type);

        CustomEnum customEnum15 = new CustomEnum("Proje1", çalışılanProje_type);
        CustomEnum customEnum16 = new CustomEnum("Proje2", çalışılanProje_type);

        CustomEnum customEnum18 = new CustomEnum("Tam Zamanlı", çalışmaTürü_type);
        CustomEnum customEnum19 = new CustomEnum("Yarı Zamanlı", çalışmaTürü_type);
        CustomEnum customEnum20 = new CustomEnum("Dönemsel", çalışmaTürü_type);

        CustomEnum customEnum21 = new CustomEnum("Aktif", çalışmaDurumu_type);
        CustomEnum customEnum22 = new CustomEnum("Pasif", çalışmaDurumu_type);
        CustomEnum customEnum23 = new CustomEnum("İzinli", çalışmaDurumu_type);

        CustomEnum customEnum24 = new CustomEnum("Proje Yöneticisi", görev_type);
        CustomEnum customEnum25 = new CustomEnum("Bilgi İşlemci", görev_type);
        CustomEnum customEnum26 = new CustomEnum("İş Analisti", görev_type);

        CustomEnum customEnum27 = new CustomEnum("Kullanıyor", servisKullanımı_type);
        CustomEnum customEnum28 = new CustomEnum("Kullanmıyor", servisKullanımı_type);

        CustomEnum customEnum44 = new CustomEnum("Eğitim", etkinlikTürü_type);
        CustomEnum customEnum45 = new CustomEnum("Yayınlar - Araştırma Serisi", etkinlikTürü_type);
        CustomEnum customEnum46 = new CustomEnum("Atölye Çalışmaları", etkinlikTürü_type);

        customEnumRepository.saveAll(List.of(customEnum0, customEnum1, customEnum2, customEnum3, customEnum4, customEnum5,
                customEnum6, customEnum7, customEnum8, customEnum9, customEnum10, customEnum11, customEnum12, customEnum13,
                customEnum14, customEnum15, customEnum16, customEnum18, customEnum19, customEnum20, customEnum21,
                customEnum22, customEnum23, customEnum24, customEnum25, customEnum26, customEnum27, customEnum28,
                customEnum44, customEnum45, customEnum46));
        Authority adminAuthority = new Authority(RoleName.ADMIN);
        Authority userAuthority = new Authority(RoleName.USER);

        authorityRepository.saveAll(List.of(adminAuthority, userAuthority));

        Authority adminAuthority1 = authorityRepository.findByAuthority(RoleName.ADMIN).orElse(null);
        Authority userAuthority1 = authorityRepository.findByAuthority(RoleName.USER).orElse(null);

        User user = new User("alice", passwordEncoder.encode("p"), new ArrayList<>(List.of(adminAuthority1)));


        List<CustomEnum> departments = List.of(customEnumRepository.findById(1L).get(), customEnumRepository.findById(2L).get(), customEnumRepository.findById(3L).get());
        List<CustomEnum> title = List.of(customEnumRepository.findById(3L).get(), customEnumRepository.findById(4L).get(), customEnumRepository.findById(5L).get());
        List<CustomEnum> task = List.of(customEnumRepository.findById(24L).get(), customEnumRepository.findById(25L).get(), customEnumRepository.findById(26L).get());
        List<String> email = List.of("alperen.akca@example.com", "yasin.herken@example.com", "mehmet.demir@example.com", "fatma.kaya@example.com", "ahmet.yildiz@example.com",
                "elif.celik@example.com", "mustafa.sahin@example.com", "zeynep.aydin@example.com", "emre.koc@example.com", "deniz.cetin@example.com",
                "gizem.korkmaz@example.com", "murat.arslan@example.com", "asli.kilic@example.com", "eren.gungor@example.com", "serkan.ozkan@example.com",
                "burak.acar", "merve.dogan@example.com", "berk.yıldırım@example.com", "sinem.aksoy@example.com", "oguzhan.tan@example.com",
                "gulsah.guler@example.com", "canan.uslu@example.com", "tolga.tekin@example.com", "busra.avci@example.com", "erkan.erdem@example.com",
                "emine.kilic@example.com", "onur.ozdemir@example.com", "gamze.bal@example.com", "baris.can@example.com", "selin.kurt@example.com",
                "hakan.sen@example.com", "yasemin.caliskan@example.com", "umut.kilic@example.com", "huseyin.kara@example.com", "sevilay.kaya@example.com",
                "tayfun.demir@example.com", "nazan.yilmaz@example.com", "kadir.koc@example.com", "ece.yildiz@example.com", "kerem.aydın@example.com",
                "yılmaz.gunes@example.com", "asya.korkmaz@example.com", "nihat.ak@example.com", "hande.oz@example.com", "tolga.kaya@example.com",
                "furkan.yilmaz@example.com", "sibel.demir@example.com", "sevinc.karakas@example.com", "sevda.arslan@example.com", "serdar.sahin@example.com");
        List<String> phone = List.of("+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678", "+90 555 345 6789", "+90 555 456 7890", "+90 555 567 8901", "+90 555 678 9012",
                "+90 555 123 4567", "+90 555 234 5678");
        List<String> names = Arrays.asList(
                "Alperen Akça", "Yasin Herken", "Mehmet Demir", "Fatma Kaya", "Ahmet Yıldız",
                "Elif Çelik", "Mustafa Şahin", "Zeynep Aydın", "Emre Koç", "Deniz Çetin",
                "Gizem Korkmaz", "Murat Arslan", "Aslı Kılıç", "Eren Güngör", "Serkan Özkan",
                "Burak Acar", "Merve Doğan", "Berk Yıldırım", "Sinem Aksoy", "Oğuzhan Tan",
                "Gülşah Güler", "Canan Uslu", "Tolga Tekin", "Büşra Avcı", "Erkan Erdem",
                "Emine Kılıç", "Onur Özdemir", "Gamze Bal", "Barış Can", "Selin Kurt",
                "Hakan Şen", "Yasemin Çalışkan", "Umut Kılıç", "Hüseyin Kara", "Sevilay Kaya",
                "Tayfun Demir", "Nazan Yılmaz", "Kadir Koç", "Ece Yıldız", "Kerem Aydın",
                "Yılmaz Güneş", "Asya Korkmaz", "Nihat Ak", "Hande Öz", "Tolga Kaya",
                "Furkan Yılmaz", "Sibel Demir", "Sevinç Karakaş", "Sevda Arslan", "Serdar Şahin"
        );

        List<User> users = new ArrayList<>();

        for(int i = 0; i < names.size(); i++) {
            User newUser = User.builder().fullName(names.get(i)).department(departments.get(i % 3)).title(title.get(i % 3)).task(task.get(i % 3)).email(email.get(i)).phone(phone.get(i)).authorities(new ArrayList<>(List.of(userAuthority1))).build();
            users.add(newUser);
        }

        projectManagementOfDigitalDepartment.addEmployee(users.get(0));
        projectManagementOfDigitalDepartment.addEmployee(users.get(1));
        projectManagementOfDigitalDepartment.addEmployee(users.get(2));

        digitalStrategyAndTransformationPlanningDepartment.addEmployee(users.get(3));
        digitalStrategyAndTransformationPlanningDepartment.addEmployee(users.get(4));
        digitalStrategyAndTransformationPlanningDepartment.addEmployee(users.get(5));

        informationScienceDepartment.addEmployee(users.get(6));
        informationScienceDepartment.addEmployee(users.get(7));

        requirementsEngineeringAndUserExperienceDepartment.addEmployee(users.get(8));
        requirementsEngineeringAndUserExperienceDepartment.addEmployee(users.get(9));
        requirementsEngineeringAndUserExperienceDepartment.addEmployee(users.get(10));
        requirementsEngineeringAndUserExperienceDepartment.addEmployee(users.get(11));

        projectManagementOfSoftwareDepartment.addEmployee(users.get(12));
        projectManagementOfSoftwareDepartment.addEmployee(users.get(13));
        projectManagementOfSoftwareDepartment.addEmployee(users.get(14));

        softwareArchitectureAndInfrastructureDepartment.addEmployee(users.get(15));
        softwareArchitectureAndInfrastructureDepartment.addEmployee(users.get(16));
        softwareArchitectureAndInfrastructureDepartment.addEmployee(users.get(17));
        softwareArchitectureAndInfrastructureDepartment.addEmployee(users.get(18));
        softwareArchitectureAndInfrastructureDepartment.addEmployee(users.get(19));

        softwareDevelopmentDepartment.addEmployee(users.get(20));
        softwareDevelopmentDepartment.addEmployee(users.get(21));
        softwareDevelopmentDepartment.addEmployee(users.get(22));

        openSourceSoftwareTechnologiesDepartment.addEmployee(users.get(23));
        openSourceSoftwareTechnologiesDepartment.addEmployee(users.get(24));
        openSourceSoftwareTechnologiesDepartment.addEmployee(users.get(25));
        openSourceSoftwareTechnologiesDepartment.addEmployee(users.get(26));

        pmoInstitution.addEmployee(users.get(27));
        pmoInstitution.addEmployee(users.get(28));
        pmoInstitution.addEmployee(users.get(29));
        pmoInstitution.addEmployee(users.get(30));
        pmoInstitution.addEmployee(users.get(31));

        businessDevelopmentAndContractManagementInstitution.addEmployee(users.get(32));
        businessDevelopmentAndContractManagementInstitution.addEmployee(users.get(33));
        businessDevelopmentAndContractManagementInstitution.addEmployee(users.get(34));

        facilityManagementInstitution.addEmployee(users.get(35));
        facilityManagementInstitution.addEmployee(users.get(36));

        productizationAndProductManagementInstitution.addEmployee(users.get(37));
        productizationAndProductManagementInstitution.addEmployee(users.get(38));
        productizationAndProductManagementInstitution.addEmployee(users.get(39));

        instituteBoardInstitution.addEmployee(users.get(40));
        instituteBoardInstitution.addEmployee(users.get(41));
        instituteBoardInstitution.addEmployee(users.get(42));
        instituteBoardInstitution.addEmployee(users.get(43));

        purchaseDepartment.addEmployee(users.get(44));

        humanResourcesDepartment.addEmployee(users.get(45));
        humanResourcesDepartment.addEmployee(users.get(46));

        educationAndOrganizationDepartment.addEmployee(users.get(47));

        qualityAndStrategyManagementInstitution.addEmployee(users.get(48));

        technologyUnionCoordinationInstitution.addEmployee(users.get(49));

        userRepository.saveAll(users);

        try {
            Resource resource = new ClassPathResource("imagess.txt");
            Path pathsFile = resource.getFile().toPath();
            List<String> base64Strings = Files.readAllLines(pathsFile);

            if (base64Strings.isEmpty()) {
                throw new IllegalArgumentException("At least one Base64 image string is required in the imagess.txt file.");
            }

            byte[] user1_image = Base64.getDecoder().decode(base64Strings.get(2));

            user.setImage(user1_image); // Set dummy image
            userRepository.save(user);

        } catch (Exception e) {
            e.printStackTrace();
        }

        user.setName("Alice");
        user.setSurname("Johnson");
        user.setFullName(user.getName() + ' ' + user.getSurname());
        user.setEmail("alice.johnson@example.com");
        user.setGender("Female");
        user.setTCKimlikNo("12345678901");
        user.setAcademicTitle("Director");
        user.setBirthDate(LocalDate.of(1985, 7, 20));
        user.setBloodType("O+");
        user.setPhone("+1234567890");
        user.setPlateNo("34ABC123");
        user.setEmergencyContact("Bob Johnson");
        user.setEmergencyContactPhone("+1234567891");
        user.setAddress("123 Board St, Metropolis, Country");

        user.setDateOfStart(LocalDate.of(2002, 9, 25));
        user.setRecordNo("REC123456");
        user.setStaff(customEnum12);
        user.setTitle(customEnum3);
        user.setDepartment(customEnum0);
        user.setProjectInWork(customEnum15);
        user.setTask(customEnum24);
        user.setStaffType(customEnum6);
        user.setTypeOfWork(customEnum18);
        user.setWorkStatus(customEnum21);
        user.setMentor("Alperen Akca");
        user.setServiceUsage("Kullanıyor");
        user.setInternalNumber("INT123");
        user.setRoomNo("R-305");

        userRepository.save(user);

        Project newProject1 = new Project("Proje1", new HashSet<>());
        Project newProject2 = new Project("Proje2", new HashSet<>());
        Team newTeam1 = new Team("Takım1", null, new HashSet<>(), new HashSet<>());
        Team newTeam2 = new Team("Takım2", null, new HashSet<>(), new HashSet<>());
        Team newTeam3 = new Team("Takım3", null, new HashSet<>(), new HashSet<>());
        Team newTeam4 = new Team("Takım4", null, new HashSet<>(), new HashSet<>());
        User newUser1 = new User();
        User newUser2 = new User();
        User newUser3 = new User();
        User newUser4 = new User();
        User newUser5 = new User();
        User newUser6 = new User();
        UserTeam userTeam1 = new UserTeam("title1", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam2 = new UserTeam("title2", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam3 = new UserTeam("title3", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam4 = new UserTeam("title4", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam5 = new UserTeam("title5", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam6 = new UserTeam("title6", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam7 = new UserTeam("title7", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam8 = new UserTeam("title8", LocalDate.of(2000, 1, 1), null);
        UserTeam userTeam9 = new UserTeam("title9", LocalDate.of(2000, 1, 1), LocalDate.of(2008, 5, 15));
        UserTeam userTeam10 = new UserTeam("title10", LocalDate.of(2009, 2, 26), null);
        Education education1 = new Education("Lisans", "İhsan Doğramacı Bilkent Üniversitesi", "Bilgisayar Mühendisliği", LocalDate.of(2000, 1, 1), LocalDate.of(2004, 6, 30), "explanation1");
        Education education2 = new Education("Yüksek Lisans", "Hacettepe Üniversitesi", "Yapay Zeka Mühendisliği", LocalDate.of(2004, 8, 1), LocalDate.of(2010, 11, 22), "explanation2");
        Experience experience1 = new Experience("Company1", "Web Developer", "Yüz Yüze", LocalDate.of(2005, 1, 1), LocalDate.of(2013, 5, 15), "reasonForLeavingEmployment1");
        Experience experience2 = new Experience("Company1", "Web Developer", "Yüz Yüze", LocalDate.of(2013, 5, 16), LocalDate.of(2018, 5, 15), "reasonForLeavingEmployment2");
        Experience experience3 = new Experience("Company1", "Web Developer", "Yüz Yüze", LocalDate.of(2018, 8, 8), LocalDate.of(2022, 5, 15), "reasonForLeavingEmployment3");
        FileDetails fileDetails1 = new FileDetails("fileName1", "fileType1", LocalDate.now(), "fileUri1", "Bilgisayar Mühendisliği", null);
        FileDetails fileDetails2 = new FileDetails("fileName2", "fileType2", LocalDate.now(), "fileUri2", "Mimarlık", null);
        FileDetails fileDetails3 = new FileDetails("fileName3", "fileType3", LocalDate.now(), "fileUri3", "Tıp", null);
        Contribution contribution1 = new Contribution(customEnum44.getName(), "description1", "link1", new HashSet<>(), null);
        Contribution contribution2 = new Contribution(customEnum45.getName(), "description2", "link2", new HashSet<>(), null);
        Contribution contribution3 = new Contribution(customEnum46.getName(), "description3", "link3", new HashSet<>(), null);
        FileDetails fileDetails4 = new FileDetails("fileName4", "fileType4", LocalDate.now(), "fileUri4", null);
        FileDetails fileDetails5 = new FileDetails("fileName5", "fileType5", LocalDate.now(), "fileUri5", null);
        FileDetails fileDetails6 = new FileDetails("fileName6", "fileType6", LocalDate.now(), "fileUri6", null);

        User alice = userRepository.findByUsername("alice").get();
        newUser1.setFullName("Emily Johnson");
        newUser2.setFullName("Michael Thompson");
        newUser3.setFullName("Sarah Davis");
        newUser4.setFullName("David Martinez");
        newUser5.setFullName("Jessica Taylor");
        newUser6.setFullName("Robert Wilson");
        newUser1.setAuthorities(new ArrayList<>(List.of(userAuthority1)));
        newUser2.setAuthorities(new ArrayList<>(List.of(userAuthority1)));
        newUser3.setAuthorities(new ArrayList<>(List.of(userAuthority1)));
        newUser4.setAuthorities(new ArrayList<>(List.of(userAuthority1)));
        newUser5.setAuthorities(new ArrayList<>(List.of(userAuthority1)));
        newUser6.setAuthorities(new ArrayList<>(List.of(userAuthority1)));
        newUser1.setDepartment(customEnum0);
        newUser2.setDepartment(customEnum0);
        newUser3.setDepartment(customEnum1);
        newUser4.setDepartment(customEnum1);
        newUser5.setDepartment(customEnum2);
        newUser6.setDepartment(customEnum2);
        newUser1.setTitle(customEnum3);
        newUser2.setTitle(customEnum3);
        newUser3.setTitle(customEnum4);
        newUser4.setTitle(customEnum4);
        newUser5.setTitle(customEnum5);
        newUser6.setTitle(customEnum5);
        newUser1.setTask(customEnum24);
        newUser2.setTask(customEnum24);
        newUser3.setTask(customEnum25);
        newUser4.setTask(customEnum25);
        newUser5.setTask(customEnum26);
        newUser6.setTask(customEnum26);
        newUser1.setEmail("emily.johnson@example.com");
        newUser2.setEmail("michael.thompson@example.com");
        newUser3.setEmail("sarah.davis@example.com");
        newUser4.setEmail("david.martinez@example.com");
        newUser5.setEmail("jessica.taylor@example.com");
        newUser6.setEmail("robert.wilson@example.com");
        newUser1.setPhone("+90 555 123 4567");
        newUser2.setPhone("+90 555 234 5678");
        newUser3.setPhone("+90 555 345 6789");
        newUser4.setPhone("+90 555 456 7890");
        newUser5.setPhone("+90 555 567 8901");
        newUser6.setPhone("+90 555 678 9012");

        projectRepository.save(newProject1);
        projectRepository.save(newProject2);
        teamRepository.save(newTeam1);
        teamRepository.save(newTeam2);
        teamRepository.save(newTeam3);
        teamRepository.save(newTeam4);
        userRepository.save(newUser1);
        userRepository.save(newUser2);
        userRepository.save(newUser3);
        userRepository.save(newUser4);
        userRepository.save(newUser5);
        userRepository.save(newUser6);
        fileRepository.save(fileDetails1);
        fileRepository.save(fileDetails2);
        fileRepository.save(fileDetails3);
        contributionRepository.save(contribution1);
        contributionRepository.save(contribution2);
        contributionRepository.save(contribution3);
        fileRepository.save(fileDetails4);
        fileRepository.save(fileDetails5);
        fileRepository.save(fileDetails6);
        experienceRepository.save(experience1);
        experienceRepository.save(experience2);
        experienceRepository.save(experience3);

        newProject1.addTeam(newTeam1);
        newProject1.addTeam(newTeam2);
        newProject2.addTeam(newTeam3);
        newProject2.addTeam(newTeam4);

        newTeam1.setProject(newProject1);
        newTeam2.setProject(newProject1);
        newTeam3.setProject(newProject2);
        newTeam4.setProject(newProject2);

        newTeam1.addUser(newUser1);
        newTeam2.addUser(newUser2);
        newTeam3.addUser(newUser3);
        newTeam3.addUser(newUser4);
        newTeam3.addUser(alice);
        newTeam4.addUser(newUser3);
        newTeam4.addUser(newUser4);
        newTeam4.addUser(newUser5);
        newTeam4.addUser(newUser6);
        newTeam4.addUser(alice);

        newUser1.addTeams(newTeam1);
        newUser2.addTeams(newTeam2);
        newUser3.addTeams(newTeam3);
        newUser3.addTeams(newTeam4);
        newUser4.addTeams(newTeam3);
        newUser4.addTeams(newTeam4);
        newUser5.addTeams(newTeam4);
        newUser6.addTeams(newTeam4);
        alice.addTeams(newTeam3);
        alice.addTeams(newTeam4);

        userTeam1.setUser(newUser1);
        userTeam1.setTeam(newTeam1);
        userTeam2.setUser(newUser2);
        userTeam2.setTeam(newTeam2);
        userTeam3.setUser(newUser3);
        userTeam3.setTeam(newTeam3);
        userTeam4.setUser(newUser3);
        userTeam4.setTeam(newTeam4);
        userTeam5.setUser(newUser4);
        userTeam5.setTeam(newTeam3);
        userTeam6.setUser(newUser4);
        userTeam6.setTeam(newTeam4);
        userTeam7.setUser(newUser5);
        userTeam7.setTeam(newTeam4);
        userTeam8.setUser(newUser6);
        userTeam8.setTeam(newTeam4);
        userTeam9.setUser(alice);
        userTeam9.setTeam(newTeam3);
        userTeam10.setUser(alice);
        userTeam10.setTeam(newTeam4);

        alice.addFile(fileDetails1);
        alice.addFile(fileDetails2);
        alice.addFile(fileDetails3);

        fileDetails1.setUser(alice);
        fileDetails2.setUser(alice);
        fileDetails3.setUser(alice);

        alice.addContribution(contribution1);
        alice.addContribution(contribution2);
        alice.addContribution(contribution3);

        contribution1.setUser(alice);
        contribution2.setUser(alice);
        contribution3.setUser(alice);

        contribution1.addAttachment(fileDetails4);
        contribution1.addAttachment(fileDetails5);
        contribution2.addAttachment(fileDetails6);

        education1.setUser(alice);
        education2.setUser(alice);
        alice.addEducation(education1);
        alice.addEducation(education2);

        experience1.setUser(alice);
        experience2.setUser(alice);
        experience3.setUser(alice);
        alice.addExperiences(experience1);
        alice.addExperiences(experience2);
        alice.addExperiences(experience3);

        fileDetails4.setContribution(contribution1);
        fileDetails5.setContribution(contribution1);
        fileDetails6.setContribution(contribution2);

        projectRepository.save(newProject1);
        projectRepository.save(newProject2);
        teamRepository.save(newTeam1);
        teamRepository.save(newTeam2);
        teamRepository.save(newTeam3);
        teamRepository.save(newTeam4);
        userRepository.save(newUser1);
        userRepository.save(newUser2);
        userRepository.save(newUser3);
        userRepository.save(newUser4);
        userRepository.save(newUser5);
        userRepository.save(newUser6);
        userRepository.save(alice);
        userTeamRepository.save(userTeam1);
        userTeamRepository.save(userTeam2);
        userTeamRepository.save(userTeam3);
        userTeamRepository.save(userTeam4);
        userTeamRepository.save(userTeam5);
        userTeamRepository.save(userTeam6);
        userTeamRepository.save(userTeam7);
        userTeamRepository.save(userTeam8);
        userTeamRepository.save(userTeam9);
        userTeamRepository.save(userTeam10);
        fileRepository.save(fileDetails1);
        fileRepository.save(fileDetails2);
        fileRepository.save(fileDetails3);
        contributionRepository.save(contribution1);
        contributionRepository.save(contribution2);
        contributionRepository.save(contribution3);
        fileRepository.save(fileDetails4);
        fileRepository.save(fileDetails5);
        fileRepository.save(fileDetails6);
        experienceRepository.save(experience1);
        experienceRepository.save(experience2);
        experienceRepository.save(experience3);
    }
}
