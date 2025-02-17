package yte.intern.personel.bilgi.yonetim.sistemi.file.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
public class FileRequest {

    private String fileName;
    private String fileType;
    private String uploadDate;
    private String fileUri;
    private String department;
    private MultipartFile multipartFile;
}
