package yte.intern.personel.bilgi.yonetim.sistemi.file.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileResponse {

    private Long id;
    private String fileName;
    private String fileType;
    private String uploadDate;
    private String fileUri;
    private String department;
}
