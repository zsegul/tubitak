package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnumType extends BaseEntity {

    private String name;

    private String category;
}
