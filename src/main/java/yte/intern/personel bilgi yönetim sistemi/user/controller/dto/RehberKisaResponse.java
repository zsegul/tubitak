package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto.ContributionResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity.Contribution;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.dto.ExperienceResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.experience.entity.Experience;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.Team;
import yte.intern.personel.bilgi.yonetim.sistemi.team.entity.UserTeam;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.Education;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public record RehberKisaResponse (

        String name,
        String surname,
        String fullName,
        String email,
        LocalDate birthDate,
        String phone,
        byte[] image,
        LocalDate dateOfStart, //işe giriş tarihi
        String recordNo, //sicil no
        String staff, //kadro
        String title,//unvan
        String department, //birim
        String staffType, //personel türü
        String typeOfWork, // çalışma türü
        String workStatus, //çalışma durumu
        String internalNumber, //dahili numara
        String roomNo, //oda numara
        String projectInWork, //çalışılan proje
        List<EducationResponse> educations,
        List<ExperienceResponse> experiences,
        List<ContributionResponse> contributions,
        List<UserTeamResponse> userTeams

) {}
