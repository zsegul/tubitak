package yte.intern.personel.bilgi.yonetim.sistemi.file.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity.Contribution;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "FILE_DETAILS")
public class FileDetails extends BaseEntity  {

    private String fileName;
    private String fileType;
    private LocalDate uploadDate;
    private String fileUri;
    private String department;

    @Lob
    private byte[] fileData;

    @ManyToOne
    private Contribution contribution;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public FileDetails(String fileName, String fileType, LocalDate uploadDate, String fileUri, String department, byte[] fileData) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.uploadDate = uploadDate;
        this.fileUri = fileUri;
        this.department = department;
        this.fileData = fileData;
    }

    public FileDetails(String fileName, String fileType, LocalDate uploadDate, String fileUri, byte[] fileData) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.uploadDate = uploadDate;
        this.fileUri = fileUri;
        this.fileData = fileData;
    }
}
