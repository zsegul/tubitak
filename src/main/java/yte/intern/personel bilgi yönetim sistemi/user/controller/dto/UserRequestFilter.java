package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto;

import lombok.*;
import yte.intern.personel.bilgi.yonetim.sistemi.user.service.QueryOperator;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRequestFilter {
    private String field;
    private QueryOperator operator;
    private String value;
}
