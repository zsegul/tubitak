package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import jakarta.validation.constraints.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;
import yte.intern.personel.bilgi.yonetim.sistemi.user.annotations.TCKimlikNoValidation;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;

public record CreateUserRequestDTO (

        @NotBlank(message = "Ad boş olamaz.")
        String name,

        @NotBlank(message = "Soyad boş olamaz.")
        String surname,

        @Email(message = "Geçersiz email adresi.")
        String email,

        @NotBlank(message = "Cinsiyet boş olamaz.")
        String gender,

        @NotBlank(message = "TC Kimlik No boş olamaz.")
        @TCKimlikNoValidation
        String TCKimlikNo,

        @NotBlank(message = "Görev boş olamaz.")
        String task,

        @NotBlank(message = "Personel türü boş olamaz.")
        String staffType,

        @NotBlank(message = "Çalışma türü boş olamaz.")
        String typeOfWork,

        @NotBlank(message = "Çalışma durumu boş olamaz.")
        String workStatus,

//        @NotNull
        @PastOrPresent(message = "İşe giriş tarihi bugünden ileri bir tarih olamaz.")
        LocalDate dateOfStart,

        @NotBlank(message = "Kadro boş olamaz.")
        String staff,

        @NotBlank(message = "Unvan boş olamaz.")
        String title,

        @NotBlank(message = "Birim boş olamaz.")
        String department,

        @Past(message = "Doğum tarihi bugünden ileri bir tarih olamaz.")
        LocalDate birthDate,

        String bloodType,
        String phone,
        String plateNo,
        String emergencyContact,
        String emergencyContactPhone,
        String address,
        String image,
        String academicTitle,
        String recordNo,
        String projectInWork,
        String mentor,
        String serviceUsage,
        String internalNumber,
        String roomNo,
        String team
) {

    public static User toEntity(CreateUserRequestDTO createUserRequestDTO, CustomEnum department, CustomEnum staff,
                                CustomEnum title, CustomEnum task, CustomEnum staffType,
                                CustomEnum typeOfWork, CustomEnum workStatus) throws IOException {

        User user = new User();
        user.setName(createUserRequestDTO.name());
        user.setSurname(createUserRequestDTO.surname());
        user.setFullName(createUserRequestDTO.name() + ' ' + createUserRequestDTO.surname());
        user.setEmail(createUserRequestDTO.email());
        user.setGender(createUserRequestDTO.gender());
        user.setTCKimlikNo(createUserRequestDTO.TCKimlikNo());
        user.setAcademicTitle(createUserRequestDTO.academicTitle());
        user.setBirthDate(createUserRequestDTO.birthDate());
        user.setBloodType(createUserRequestDTO.bloodType());
        user.setPhone(createUserRequestDTO.phone());
        user.setPlateNo(createUserRequestDTO.plateNo());
        user.setEmergencyContact(createUserRequestDTO.emergencyContact());
        user.setEmergencyContactPhone(createUserRequestDTO.emergencyContactPhone());
        user.setAddress(createUserRequestDTO.address());

        if (createUserRequestDTO.image() != null && !createUserRequestDTO.image().isEmpty()) {
            user.setImage(Base64.getDecoder().decode(createUserRequestDTO.image()));
        } else {
            Resource resource = new ClassPathResource("imagess.txt");
            Path pathsFile = resource.getFile().toPath();
            List<String> base64Strings = Files.readAllLines(pathsFile);

            if (base64Strings.isEmpty()) {
                throw new IllegalArgumentException("At least one Base64 image string is required in the imagess.txt file.");
            }

            user.setImage(Base64.getDecoder().decode(base64Strings.get(1)));
        }

        user.setDateOfStart(createUserRequestDTO.dateOfStart());
        user.setRecordNo(createUserRequestDTO.recordNo());
        user.setStaff(staff);
        user.setTitle(title);
        user.setDepartment(department);
        user.setTask(task);
        user.setStaffType(staffType);
        user.setTypeOfWork(typeOfWork);
        user.setWorkStatus(workStatus);
        user.setMentor(createUserRequestDTO.mentor());
        user.setServiceUsage(createUserRequestDTO.serviceUsage());
        user.setInternalNumber(createUserRequestDTO.internalNumber());
        user.setRoomNo(createUserRequestDTO.roomNo());
        user.setTeams(new HashSet<>());
        return user;
    }
}
