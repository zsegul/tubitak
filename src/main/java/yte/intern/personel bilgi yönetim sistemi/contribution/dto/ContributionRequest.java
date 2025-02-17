package yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class ContributionRequest {
    private String eventType;
    private String description;
    private String link;
    private List<MultipartFile> files;
}

