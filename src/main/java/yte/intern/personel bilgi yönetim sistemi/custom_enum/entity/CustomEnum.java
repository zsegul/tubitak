package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;

@Entity
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomEnum extends BaseEntity {

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "enum_type_id")
    private EnumType enumType;
}
