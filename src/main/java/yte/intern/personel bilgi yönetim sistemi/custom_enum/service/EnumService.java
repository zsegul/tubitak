package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.service.ContributionService;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.AddEnumRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.CustomEnumDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.EnumTypeWithEnumsDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.UpdateEnumsRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.EnumType;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository.CustomEnumRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;
import yte.intern.personel.bilgi.yonetim.sistemi.exception.NotFoundException;
import yte.intern.personel.bilgi.yonetim.sistemi.project.entity.Project;
import yte.intern.personel.bilgi.yonetim.sistemi.project.repository.ProjectRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.project.service.ProjectService;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.UserTeam;
import yte.intern.personel.bilgi.yonetim.sistemi.team.repository.TeamRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.team.repository.UserTeamRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnumService {
    private final CustomEnumRepository customEnumRepository;
    private final EnumTypeService enumTypeService;
    private final ContributionService contributionService;
    private final ProjectService projectService;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final UserTeamRepository userTeamRepository;
    private final ProjectRepository projectRepository;

    public CustomEnum getEnumByNameAndType(String name, String typeName) {
        return customEnumRepository.findByNameAndEnumTypeName(name, typeName);
    }

    public List<CustomEnum> getAllEnums() {
        return customEnumRepository.findAll();
    }

    public List<CustomEnum> getEnumsByType(String typeName) {

        if (typeName.equals("Event Type")) {
            return contributionService.getEventTypes().stream()
                    .map(eventType -> new CustomEnum(eventType, enumTypeService.getEnumTypeByName("Event Type")))
                    .collect(Collectors.toList());
        }

        return customEnumRepository.findByEnumTypeName(typeName);
    }

    public List<EnumTypeWithEnumsDTO> getEnumTypesWithEnums() {
        List<EnumType> enumTypes = enumTypeService.getAllEnumTypes();
        return enumTypes.stream()
                .map(enumType -> new EnumTypeWithEnumsDTO(
                        enumType.getName(),
                        customEnumRepository.findByEnumTypeName(enumType.getName()).stream()
                                .map(customEnum -> new CustomEnumDTO(customEnum.getName()))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    public CustomEnum addEnum(AddEnumRequestDTO addEnumRequestDTO, String typeName) {
        EnumType enumType = enumTypeService.getEnumTypeByName(typeName);
        if (enumType == null){
            throw new NotFoundException("Enum type is not found");
        }

        CustomEnum newCustomEnum = new CustomEnum(addEnumRequestDTO.name(), enumType);
        return customEnumRepository.save(newCustomEnum);
    }

    @Transactional
    public void deleteEnum(Long enumId) {
        if (customEnumRepository.existsById(enumId)) {

            List<User> users = userRepository.findByCustomEnumId(enumId);

//            if (!users.isEmpty()) {
//                throw new NotFoundException("Enum is used in user entity");
//            }

            users.forEach(user -> {
                if (user.getStaff() != null && user.getStaff().getId().equals(enumId)) {
                    user.setStaff(null);
                }
                else if (user.getTitle() != null && user.getTitle().getId().equals(enumId)) {
                    user.setTitle(null);
                }
                else if (user.getDepartment() != null && user.getDepartment().getId().equals(enumId)) {
                    user.setDepartment(null);
                }
                else if (user.getProjectInWork() != null && user.getProjectInWork().getId().equals(enumId)) {
                    user.setProjectInWork(null);
                }
                else if (user.getTask() != null && user.getTask().getId().equals(enumId)) {
                    user.setTask(null);
                }
                else if (user.getStaffType() != null && user.getStaffType().getId().equals(enumId)) {
                    user.setStaffType(null);
                }
                else if (user.getTypeOfWork() != null && user.getTypeOfWork().getId().equals(enumId)) {
                    user.setTypeOfWork(null);
                }
                else if (user.getWorkStatus() != null && user.getWorkStatus().getId().equals(enumId)) {
                    user.setWorkStatus(null);
                }
            });

            CustomEnum customEnum = customEnumRepository.findById(enumId).get();

            if (customEnum.getEnumType().getName().equals("Etkinlik Türü")) {
                contributionService.deleteContributionEventType(customEnum.getName());
            }

            if (customEnum.getEnumType().getName().equals("Çalışılan Proje")) {
                List<Team> teams = teamRepository.findAllByProjectName(customEnum.getName());
                teams.forEach(team -> {
                    Set<UserTeam> userTeams = userTeamRepository.findByTeam(team);
                    userTeams.forEach(userTeam -> {
                        userTeam.setUser(null);
                        userTeam.setTeam(null);
                    });
                    userTeamRepository.deleteAll(userTeams);
                    userTeamRepository.flush();

                    Set<User> teamUsers = team.getUsers();
                    teamUsers.forEach(user -> {
                        user.removeTeams(team);
                    });

                    team.setProject(null);
                    team.setUserTeams(null);
                    team.setUsers(null);

                    teamRepository.deleteById(team.getId());
                });

                Project projectToRemove = projectService.getProjectByName(customEnum.getName());

                projectRepository.delete(projectToRemove);
            }
            customEnumRepository.deleteById(enumId);
        }

        else {
            throw new NotFoundException("Enum is not found");
        }
    }

    public List<CustomEnum> updateEnums(List<UpdateEnumsRequestDTO> updateEnumsRequestDTO) {
        updateEnumsRequestDTO.forEach(updateEnum -> {
            if (customEnumRepository.existsById(updateEnum.id())) {
                CustomEnum customEnum = customEnumRepository.findById(updateEnum.id()).get();
                String oldValue = customEnum.getName();
                customEnum.setName(updateEnum.value());
                customEnumRepository.save(customEnum);

                if (customEnum.getEnumType().getName().equals("Etkinlik Türü")) {
                    contributionService.updateContributionEventTypes(oldValue, updateEnum.value());
                }

                if (customEnum.getEnumType().getName().equals("Çalışılan Proje")) {
                    projectService.updateProjectName(oldValue, updateEnum.value());
                }
            } else {
                throw new NotFoundException("Enum is not found");
            }
        });
        return customEnumRepository.findAll();
    }
}
