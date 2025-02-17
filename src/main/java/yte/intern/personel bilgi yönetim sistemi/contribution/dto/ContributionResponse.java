package yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileResponse;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContributionResponse {

    private Long id;
    private String eventType;
    private String description;
    private String link;
    private List<FileResponse> fileResponseList;
}
