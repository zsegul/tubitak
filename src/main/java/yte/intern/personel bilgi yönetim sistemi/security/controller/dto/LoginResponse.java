package yte.intern.personel.bilgi.yonetim.sistemi.security.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

    private String name;
    private String surname;
    private Long id;
    private List<String> authorities;

}
