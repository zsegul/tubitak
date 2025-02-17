package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserTeamResponse {

    private Long id;
    private String projectName;
    private String teamName;
    private String title;
    private String startDate;
    private String endDate;

}
