package yte.intern.personel.bilgi.yonetim.sistemi.user.service;

import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity.Contribution;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.repository.ContributionRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.service.EnumService;
import yte.intern.personel.bilgi.yonetim.sistemi.project.entity.Project;
import yte.intern.personel.bilgi.yonetim.sistemi.project.repository.ProjectRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.project.service.ProjectService;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.UserTeam;
import yte.intern.personel.bilgi.yonetim.sistemi.team.repository.TeamRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto.ContributionResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.dto.ExperienceResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.*;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.Authority;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.service.AuthorityService;
import yte.intern.personel.bilgi.yonetim.sistemi.exception.NotFoundException;
import yte.intern.personel.bilgi.yonetim.sistemi.team.repository.UserTeamRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserAuthoritiesResponseDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserRoleUpdateRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserTeamResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.UserResponseAdmin;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.authorisation.AuthorisationRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.authorisation.AuthorisationResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile.CompInformation;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile.ProfileRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile.ProfileResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile.UserInformation;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.*;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.RehberKisaResponse;

import java.io.IOException;
import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserTeamRepository userTeamRepository;
    private final AuthorityService authorityService;
    private final TeamRepository teamRepository;
    private final EnumService enumService;
    private final ProjectService projectService;
    private final ContributionRepository contributionRepository;
    private final ProjectRepository projectRepository;

    private UserResponseAdmin convertToUserResponseAdmin(User user) {

        CustomEnum department = user.getDepartment();
        CustomEnum title = user.getTitle();
        CustomEnum task = user.getTask();

        return new UserResponseAdmin(
                user.getId(),
                user.getFullName(),
                department == null ? "" : department.getName(),
                title == null ? "" : title.getName(),
                task == null ? "" : task.getName(),
                user.getEmail(),
                user.getPhone());
    }

    private UserResponseUser convertToUserResponseUser(User user) {

        CustomEnum department = user.getDepartment();
        CustomEnum title = user.getTitle();
        CustomEnum task = user.getTask();

        return new UserResponseUser(
                user.getId(),
                user.getFullName(),
                department == null ? "" : department.getName(),
                title == null ? "" : title.getName(),
                task == null ? "" : task.getName(),
                user.getEmail(),
                user.getPhone());
    }

    private String fieldNameToEnumType(String fieldName) {
        switch (fieldName) {
            case "department" -> {
                return "Birim";
            }
            case "title" -> {
                return "Unvan";
            }
            case "task" -> {
                return "Görev";
            }
            default -> {
                return "";
            }
        }
    }

    public PageResponseUser searchUsersUser(SearchRequestUser searchRequestUser) {

        boolean isSearched = searchRequestUser.isSearched();

        Pageable pageable = PageRequest.of(searchRequestUser.page(), searchRequestUser.pageSize());
        UserRequest userRequest = searchRequestUser.userRequest();
        if (isSearched) {
            List<UserRequestFilter> filters = new ArrayList<>();
            List<Field> fields = List.of(userRequest.getClass().getDeclaredFields());
            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(userRequest);
                    if (value != null && !value.toString().equalsIgnoreCase("")) {
                        String name = field.getName();
                        switch (name) {
                            case "fullName" -> {
                                UserRequestFilter filter = new UserRequestFilter(name, QueryOperator.LIKE, value.toString().toLowerCase());
                                filters.add(filter);
                            }
                            case "title", "department", "task" -> {
                                CustomEnum customEnum = enumService.getEnumByNameAndType(value.toString(), fieldNameToEnumType(name));
                                UserRequestFilter filter = new UserRequestFilter(name, QueryOperator.EQUALS, customEnum.getId().toString());
                                filters.add(filter);
                            }
                            default -> {
                                UserRequestFilter filter = new UserRequestFilter(name, QueryOperator.EQUALS, value.toString());
                                filters.add(filter);
                            }
                        }
                    } else {
                        UserRequestFilter filter = new UserRequestFilter(field.getName(), QueryOperator.LIKE, "");
                        filters.add(filter);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
            Specification<User> specification = getSpecificationFromFilters(filters);
            Page<User> userPage = userRepository.findAll(specification, pageable);

            Long totalRows = userPage.getTotalElements();
            List<UserResponseUser> userResponses = userPage.getContent().stream()
                    .map(this::convertToUserResponseUser)
                    .toList();

            return new PageResponseUser(userResponses, totalRows);
        } else {
            Page<User> userPage = userRepository.findAll(pageable);
            Long totalRows = userPage.getTotalElements();
            List<UserResponseUser> userResponses = userPage.getContent().stream()
                    .map(this::convertToUserResponseUser)
                    .toList();

            return new PageResponseUser(userResponses, totalRows);
        }
    }

    public PageResponseAdmin searchUsersAdmin(SearchRequestAdmin searchRequestAdmin) {

        boolean isSearched = searchRequestAdmin.isSearched();

        Pageable pageable = PageRequest.of(searchRequestAdmin.page(), searchRequestAdmin.pageSize());
        UserRequest userRequest = searchRequestAdmin.userRequest();
        if (isSearched) {
            List<UserRequestFilter> filters = new ArrayList<>();
            List<Field> fields = List.of(userRequest.getClass().getDeclaredFields());
            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(userRequest);
                    if (value != null && !value.toString().equalsIgnoreCase("")) {
                        String name = field.getName();
                        switch (name) {
                            case "fullName" -> {
                                UserRequestFilter filter = new UserRequestFilter(name, QueryOperator.LIKE, value.toString().toLowerCase());
                                filters.add(filter);
                            }
                            case "title", "department", "task" -> {
                                CustomEnum customEnum = enumService.getEnumByNameAndType(value.toString(), fieldNameToEnumType(name));
                                UserRequestFilter filter = new UserRequestFilter(name, QueryOperator.EQUALS, customEnum.getId().toString());
                                filters.add(filter);
                            }
                            default -> {
                                UserRequestFilter filter = new UserRequestFilter(name, QueryOperator.EQUALS, value.toString());
                                filters.add(filter);
                            }
                        }
                    } else {
                        UserRequestFilter filter = new UserRequestFilter(field.getName(), QueryOperator.LIKE, "");
                        filters.add(filter);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
            Specification<User> specification = getSpecificationFromFilters(filters);
            Page<User> userPage = userRepository.findAll(specification, pageable);
            Long totalRows = userPage.getTotalElements();
            List<UserResponseAdmin> adminResponses = userPage.getContent().stream()
                    .map(this::convertToUserResponseAdmin)
                    .toList();

            return new PageResponseAdmin(adminResponses, totalRows);
        } else {
            Page<User> userPage = userRepository.findAll(pageable);
            Long totalRows = userPage.getTotalElements();
            List<UserResponseAdmin> adminResponses = userPage.getContent().stream()
                    .map(this::convertToUserResponseAdmin)
                    .toList();

            return new PageResponseAdmin(adminResponses, totalRows);
        }
    }

    private Specification<User> createSpecification(UserRequestFilter input) {
        switch (input.getOperator()) {
            case EQUALS:
                if (!(input.getValue() instanceof String) || input.getValue() == null || input.getValue().toString().equalsIgnoreCase("")) {
                    return null;
                }

                switch (input.getField()) {
                    case "team" -> {
                        Set<User> users1 = new HashSet<>();
                        Team team = teamRepository.findByTeamName(input.getValue()).orElse(null);
                        for (User user : team.getUsers()) {
                            users1.add(user);
                        }

                        return (root, query, criteriaBuilder) -> root.in(users1);
                    }
                    case "project" -> {
                        Project projectByName = projectRepository.findByProjectName(input.getValue());
                        Set<User> users2 = new HashSet<>();

                        for (Team team : projectByName.getTeams()) {
                            for (User user : team.getUsers()) {
                                users2.add(user);
                            }

                        }
                        return (root, query, criteriaBuilder) -> root.in(users2);
                    }
                    case "contribution" -> {
                        Set<User> users3 = new HashSet<>();
                        Set<Contribution> contributions = contributionRepository.findByEventType(input.getValue());
                        for (Contribution contribution : contributions) {
                            users3.add(contribution.getUser());
                        }

                        return (root, query, criteriaBuilder) -> root.in(users3);
                    }
                    case "title", "department", "task" -> {
                        return (root, query, criteriaBuilder) ->
                                criteriaBuilder.equal(root.get(input.getField()).get("id"), Long.parseLong(input.getValue().toString()));
                    }
                    default -> {
                        return (root, query, criteriaBuilder) ->
                                criteriaBuilder.equal(criteriaBuilder.lower(root.get(input.getField())), input.getValue().toString().toLowerCase());
                    }
                }

            case LIKE:
                if (input.getValue() instanceof String && input.getValue() != null && !input.getValue().toString().equalsIgnoreCase("")) {
                    return (root, query, criteriaBuilder) ->
                            criteriaBuilder.like(criteriaBuilder.lower(root.get(input.getField())), "%" + input.getValue().toString().toLowerCase() + "%");
                } else {
                    return null;
                }

            default:
                throw new RuntimeException("Operation not supported yet");
        }
    }


    public Specification<User> getSpecificationFromFilters(List<UserRequestFilter> filter) {
        Specification<User> spec = Specification.where(null);
        for (UserRequestFilter input : filter) {
            spec = spec.and(createSpecification(input));
        }
        return spec;
    }

    public List<UserAuthoritiesResponseDTO> userToUserAuthoritiesDTO(List<User> users) {
        return users.stream()
                .map(user -> {
                    String surname = user.getFullName().split(" ")[user.getFullName().split(" ").length - 1];
                    String name = user.getFullName().substring(0, user.getFullName().length() - surname.length() - 1);
                    return new UserAuthoritiesResponseDTO(
                            user.getId(),
                            name,
                            surname,
                            user.getAuthorities().stream().map(Authority::getAuthorityName).toList()
                    );
                })
                .toList();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public AuthorisationResponse getUsersForAuthorizationByPage(AuthorisationRequest authorisationRequest){

        boolean isSearched = authorisationRequest.isSearched();
        Pageable pageable = PageRequest.of(authorisationRequest.page(), authorisationRequest.pageSize());

        if (isSearched) {
            List<UserRequestFilter> filters = new ArrayList<>();
            List<Field> fields = List.of(authorisationRequest.getClass().getDeclaredFields());

            for (Field field : fields) {
                field.setAccessible(true);
                Object value = null;
                try {
                    value = field.get(authorisationRequest);
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }

                if (field.getName().equals("fullName")) {
                    UserRequestFilter filter = new UserRequestFilter(field.getName(), QueryOperator.LIKE, value.toString().toLowerCase());
                    filters.add(filter);
                }
            }

            Specification<User> specification = getSpecificationFromFilters(filters);
            Page<User> userPage = userRepository.findAll(specification, pageable);
            Long totalRows = userPage.getTotalElements();
            List<UserAuthoritiesResponseDTO> adminResponses = userToUserAuthoritiesDTO(userPage.getContent());

            return new AuthorisationResponse(adminResponses, totalRows);
        } else {
            Page<User> userPage = userRepository.findAll(pageable);
            Long totalRows = userPage.getTotalElements();
            List<UserAuthoritiesResponseDTO> adminResponses = userToUserAuthoritiesDTO(userPage.getContent());

            return new AuthorisationResponse(adminResponses, totalRows);
        }
    }

    public String createUser(CreateUserRequestDTO createUserRequestDTO) throws IOException {
        if (userRepository.findByTCKimlikNo(createUserRequestDTO.TCKimlikNo()).isPresent()) {
            throw new NotFoundException("User already exists");
        }

        CustomEnum department = enumService.getEnumByNameAndType(createUserRequestDTO.department(), "Birim");
        CustomEnum staff = enumService.getEnumByNameAndType(createUserRequestDTO.staff(), "Kadro");
        CustomEnum title = enumService.getEnumByNameAndType(createUserRequestDTO.title(), "Unvan");
        CustomEnum task = enumService.getEnumByNameAndType(createUserRequestDTO.task(), "Görev");
        CustomEnum staffType = enumService.getEnumByNameAndType(createUserRequestDTO.staffType(), "Personel Türü");
        CustomEnum typeOfWork = enumService.getEnumByNameAndType(createUserRequestDTO.typeOfWork(), "Çalışma Türü");
        CustomEnum workStatus = enumService.getEnumByNameAndType(createUserRequestDTO.workStatus(), "Çalışma Durumu");

        User user = CreateUserRequestDTO.toEntity(createUserRequestDTO, department, staff, title,
                task, staffType, typeOfWork, workStatus);

        userRepository.save(user);

        // project is provided
        if (createUserRequestDTO.projectInWork() != null && !createUserRequestDTO.projectInWork().isEmpty()) {
            Project project = projectService.getProjectByName(createUserRequestDTO.projectInWork());

            // team is not provided
            if (createUserRequestDTO.team() == null || createUserRequestDTO.team().isEmpty()) {
                if (project.getTeams().isEmpty()) {
                    throw new NotFoundException("Project doesn't have any team");
                } else {
                    throw new NotFoundException("Team is not provided");
                }
            }

            // team is provided
            else {
                Team team = teamRepository.findByTeamName(createUserRequestDTO.team())
                        .orElseThrow(() -> new NotFoundException("Team not found"));

                if (!project.getTeams().contains(team)) {
                    throw new NotFoundException("Project doesn't have the specified team");
                }

                team.addUser(user);
                teamRepository.save(team);

                UserTeam userTeam = new UserTeam(team.getTeamName(), LocalDate.now(), null);
                userTeam.setUser(user);
                userTeam.setTeam(team);
                userTeamRepository.save(userTeam);

                CustomEnum projectInWork = enumService.getEnumByNameAndType(project.getProjectName(), "Çalışılan Proje");
                user.setProjectInWork(projectInWork);
                user.addTeams(team);
                userRepository.save(user);

                return "User created successfully";
            }
        }

        else {
            if (createUserRequestDTO.team() != null && !createUserRequestDTO.team().isEmpty()) {
                throw new NotFoundException("Project is not provided");
            }
        }

        return "User created successfully";
    }

    public List<User> updateUserRoles(List<UserRoleUpdateRequestDTO> userRoleUpdateRequestDTO) {
        userRoleUpdateRequestDTO.forEach(userRoleUpdate -> {
            User user = userRepository.findById(userRoleUpdate.userId())
                    .orElseThrow(() -> new NoResultException("User not found"));

            List<String> value = userRoleUpdate.roles();

            user.getAuthorities().clear();

            value.forEach(role -> {
                Authority authority = authorityService.getCreateAuthoritory(role);
                user.getAuthorities().add(authority);
            });

            userRepository.save(user);
        });

        return userRepository.findAll();
    }

    @Transactional
    public List<UserTeamResponse> getUserTeams(Long id) {

        if (!userRepository.existsById(id)) {
            throw new NoResultException("User not found");
        }

        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();

        userTeamRepository.findUserTeamByUserId(id)
                .forEach(userTeam -> {
                    UserTeamResponse newUserTeamResponse = new UserTeamResponse();
                    newUserTeamResponse.setId(userTeam.getId());
                    newUserTeamResponse.setProjectName(userTeam.getTeam().getProject().getProjectName());
                    newUserTeamResponse.setTeamName(userTeam.getTeam().getTeamName());
                    newUserTeamResponse.setTitle(userTeam.getTitle());
                    newUserTeamResponse.setStartDate(userTeam.getStartDate().toString());
                    if (userTeam.getEndDate() != null) {
                        newUserTeamResponse.setEndDate(userTeam.getEndDate().toString());
                    } else {
                        newUserTeamResponse.setEndDate("Devam Ediyor");
                    }
                    userTeamResponseList.add(newUserTeamResponse);
                });
        return userTeamResponseList;
    }

    public ProfileResponse getInfos(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new NoResultException("User not found"));
        UserInformation userInformation = new UserInformation(
                user.getName(),
                user.getSurname(),
                user.getTCKimlikNo(),
                user.getGender(),
                user.getAcademicTitle(),
                user.getEmail(),
                user.getBirthDate() != null ? user.getBirthDate().toString() : "",
                user.getBloodType(),
                user.getPhone(),
                user.getPlateNo(),
                user.getEmergencyContact(),
                user.getEmergencyContactPhone(),
                user.getAddress()
        );

        CompInformation compInformation = new CompInformation(
                user.getDateOfStart() != null ? user.getDateOfStart().toString() : "",
                user.getRecordNo(),
                user.getStaff() != null && user.getStaff().getName() != null ? user.getStaff().getName() : "",
                user.getTitle() != null && user.getTitle().getName() != null ? user.getTitle().getName() : "",
                user.getDepartment() != null && user.getDepartment().getName() != null ? user.getDepartment().getName() : "",
                user.getProjectInWork() != null && user.getProjectInWork().getName() != null ? user.getProjectInWork().getName() : "",
                user.getTask() != null && user.getTask().getName() != null ? user.getTask().getName() : "",
                user.getMentor(), // Eğer mentor için null kontrolü isterseniz buraya ekleyebilirsiniz.
                user.getStaffType() != null && user.getStaffType().getName() != null ? user.getStaffType().getName() : "",
                user.getTypeOfWork() != null && user.getTypeOfWork().getName() != null ? user.getTypeOfWork().getName() : "",
                user.getWorkStatus() != null && user.getWorkStatus().getName() != null ? user.getWorkStatus().getName() : "",
                user.getServiceUsage(),
                user.getInternalNumber(),
                user.getRoomNo()
        );
        String base64Image ="";
        if(user.getImage() != null){
            byte[] imageBytes = user.getImage();
            base64Image = Base64.getEncoder().encodeToString(imageBytes);
        }
        return new ProfileResponse(ResponseEntity.ok().body(base64Image), userInformation, compInformation);
    }

    public ProfileResponse updateUserProfile(ProfileRequest profileRequest) {

        User user = userRepository.findById(profileRequest.userId())
                .orElseThrow(() -> new NoResultException("User not found"));

        if (profileRequest.userInformation() != null) {
            if (profileRequest.userInformation().ad() != null) {
                user.setName(profileRequest.userInformation().ad());
            }
            if (profileRequest.userInformation().soyad() != null) {
                user.setSurname(profileRequest.userInformation().soyad());
            }
            if (profileRequest.userInformation().tcKimlikNo() != null) {
                user.setTCKimlikNo(profileRequest.userInformation().tcKimlikNo());
            }
            if (profileRequest.userInformation().cinsiyet() != null) {
                user.setGender(profileRequest.userInformation().cinsiyet());
            }
            if (profileRequest.userInformation().akademikUnvan() != null) {
                user.setAcademicTitle(profileRequest.userInformation().akademikUnvan());
            }
            if (profileRequest.userInformation().email() != null) {
                user.setEmail(profileRequest.userInformation().email());
            }
            if (profileRequest.userInformation().dogumTarihi() != null) {
                user.setBirthDate(LocalDate.parse(profileRequest.userInformation().dogumTarihi()));
            }
            if (profileRequest.userInformation().kanGrubu() != null) {
                user.setBloodType(profileRequest.userInformation().kanGrubu());
            }
            if (profileRequest.userInformation().telefon() != null) {
                user.setPhone(profileRequest.userInformation().telefon());
            }
            if (profileRequest.userInformation().aracPlakasi() != null) {
                user.setPlateNo(profileRequest.userInformation().aracPlakasi());
            }
            if (profileRequest.userInformation().acilDurumKisi() != null) {
                user.setEmergencyContact(profileRequest.userInformation().acilDurumKisi());
            }
            if (profileRequest.userInformation().acilDurumKisiTelefon() != null) {
                user.setEmergencyContactPhone(profileRequest.userInformation().acilDurumKisiTelefon());
            }
            if (profileRequest.userInformation().ikametgahAdresi() != null) {
                user.setAddress(profileRequest.userInformation().ikametgahAdresi());
            }
        }

        if (profileRequest.compInformation() != null) {
            if (profileRequest.compInformation().iseGirisTarihi() != null) {
                user.setDateOfStart(LocalDate.parse(profileRequest.compInformation().iseGirisTarihi()));
            }
            if (profileRequest.compInformation().sicilNo() != null) {
                user.setRecordNo(profileRequest.compInformation().sicilNo());
            }
            if (profileRequest.compInformation().kadro() != null) {
                user.setStaff(enumService.getEnumByNameAndType(profileRequest.compInformation().kadro(), "Kadro"));
            }
            if (profileRequest.compInformation().unvan() != null) {
                user.setTitle(enumService.getEnumByNameAndType(profileRequest.compInformation().unvan(), "Unvan"));
            }
            if (profileRequest.compInformation().birim() != null) {
                user.setDepartment(enumService.getEnumByNameAndType(profileRequest.compInformation().birim(), "Birim"));
            }
            if (profileRequest.compInformation().calisilanProje() != null) {
                user.setProjectInWork(enumService.getEnumByNameAndType(profileRequest.compInformation().calisilanProje(), "Çalışılan Proje"));
            }
            if (profileRequest.compInformation().gorev() != null) {
                user.setTask(enumService.getEnumByNameAndType(profileRequest.compInformation().gorev(), "Görev"));
            }
            if (profileRequest.compInformation().mentor() != null) {
                user.setMentor(profileRequest.compInformation().mentor());
            }
            if (profileRequest.compInformation().personelTuru() != null) {
                user.setStaffType(enumService.getEnumByNameAndType(profileRequest.compInformation().personelTuru(), "Personel Türü"));
            }
            if (profileRequest.compInformation().calismaTuru() != null) {
                user.setTypeOfWork(enumService.getEnumByNameAndType(profileRequest.compInformation().calismaTuru(), "Çalışma Türü"));
            }
            if (profileRequest.compInformation().calismaDurumu() != null) {
                user.setWorkStatus(enumService.getEnumByNameAndType(profileRequest.compInformation().calismaDurumu(), "Çalışma Durumu"));
            }
            if (profileRequest.compInformation().servisKullanimi() != null) {
                user.setServiceUsage(profileRequest.compInformation().servisKullanimi());
            }
            if (profileRequest.compInformation().dahiliNumara() != null) {
                user.setInternalNumber(profileRequest.compInformation().dahiliNumara());
            }
            if (profileRequest.compInformation().odaNumara() != null) {
                user.setRoomNo(profileRequest.compInformation().odaNumara());
            }
        }


        userRepository.save(user);

        UserInformation userInformation = new UserInformation(
                user.getName() != null ? user.getName() : "",
                user.getSurname() != null ? user.getSurname() : "",
                user.getTCKimlikNo() != null ? user.getTCKimlikNo() : "",
                user.getGender() != null ? user.getGender() : "",
                user.getAcademicTitle() != null ? user.getAcademicTitle() : "",
                user.getEmail() != null ? user.getEmail() : "",
                user.getBirthDate() != null ? user.getBirthDate().toString() : "",
                user.getBloodType() != null ? user.getBloodType() : "",
                user.getPhone() != null ? user.getPhone() : "",
                user.getPlateNo() != null ? user.getPlateNo() : "",
                user.getEmergencyContact() != null ? user.getEmergencyContact() : "",
                user.getEmergencyContactPhone() != null ? user.getEmergencyContactPhone() : "",
                user.getAddress() != null ? user.getAddress() : ""
        );

        CompInformation compInformation = new CompInformation(
                user.getDateOfStart() != null ? user.getDateOfStart().toString() : "",
                user.getRecordNo() != null ? user.getRecordNo() : "",
                user.getStaff() != null && user.getStaff().getName() != null ? user.getStaff().getName() : "",
                user.getTitle() != null && user.getTitle().getName() != null ? user.getTitle().getName() : "",
                user.getDepartment() != null && user.getDepartment().getName() != null ? user.getDepartment().getName() : "",
                user.getProjectInWork() != null && user.getProjectInWork().getName() != null ? user.getProjectInWork().getName() : "",
                user.getTask() != null && user.getTask().getName() != null ? user.getTask().getName() : "",
                user.getMentor() != null ? user.getMentor() : "",
                user.getStaffType() != null && user.getStaffType().getName() != null ? user.getStaffType().getName() : "",
                user.getTypeOfWork() != null && user.getTypeOfWork().getName() != null ? user.getTypeOfWork().getName() : "",
                user.getWorkStatus() != null && user.getWorkStatus().getName() != null ? user.getWorkStatus().getName() : "",
                user.getServiceUsage() != null ? user.getServiceUsage() : "false",
                user.getInternalNumber() != null ? user.getInternalNumber() : "",
                user.getRoomNo() != null ? user.getRoomNo() : ""
        );
        String base64Image ="";
        if(user.getImage() != null){
            byte[] imageBytes = user.getImage();
            base64Image = Base64.getEncoder().encodeToString(imageBytes);
        }

        return new ProfileResponse(ResponseEntity.ok().body(base64Image), userInformation, compInformation);
    }

    public String uploadAvatar(MultipartFile file, Long userId) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new NoResultException("User not found"));
        byte[] bytes = file.getBytes();
        user.setImage(bytes);
        userRepository.save(user);

        byte[] imageBytes = user.getImage();
        return Base64.getEncoder().encodeToString(imageBytes);

    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }
    public RehberKisaResponse getRehberKisa(Long id) {
        User user = userRepository.findById(id).get();


        return new RehberKisaResponse(
                user.getName(),
                user.getSurname(),
                user.getFullName(),
                user.getEmail(),
                user.getBirthDate(),
                user.getPhone(),
                user.getImage(),
                user.getDateOfStart(),
                user.getRecordNo(),
                user.getStaff() == null ? "" : user.getStaff().getName(),
                user.getTitle() == null ? "" : user.getTitle().getName(),
                user.getDepartment() == null ? "" : user.getDepartment().getName(),
                user.getStaffType() == null ? "" : user.getStaffType().getName(),
                user.getTypeOfWork() == null ? "" : user.getTypeOfWork().getName(),
                user.getWorkStatus() == null ? "" : user.getWorkStatus().getName(),
                user.getInternalNumber(),
                user.getRoomNo(),
                user.getProjectInWork() == null ? "" : user.getProjectInWork().getName(),
                user.getEducations().stream().map(e->new EducationResponse(e.getId(), e.getType(), e.getUniversity(), e.getDepartment(),e.getStartDate(), e.getGraduationDate(), e.getExplanation() )).toList(),
                user.getExperiences().stream().map(e-> new ExperienceResponse(e.getId(), e.getCompanyName(), e.getTitle(), e.getTypeOfEmployment(),e.getStartDate(),e.getEndDate(),e.getReasonForLeavingEmployment())).toList(),
                user.getContributions().stream()
                        .map(e-> new ContributionResponse(e.getId(), e.getEventType(), e.getDescription(), e.getLink(), e.getAttachments().stream()
                                .map(file ->  new FileResponse(file.getId(), file.getFileName(), file.getFileType(), file.getUploadDate().toString(), file.getFileUri(), file.getDepartment())).toList())).toList(),
                user.getUserTeams().stream()
                        .map(u -> new UserTeamResponse(
                            u.getId(),
                            u.getTeam().getProject().getProjectName(),
                            u.getTeam().getTeamName(),
                            u.getTitle(),
                            u.getStartDate() == null ? "" : u.getStartDate().toString(),
                            u.getEndDate() == null ? "" : u.getEndDate().toString()
                        )
                ).toList()
        );
    }
}

