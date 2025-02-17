package yte.intern.personel.bilgi.yonetim.sistemi.authority.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Authority extends BaseEntity implements GrantedAuthority  {

    @Enumerated(EnumType.STRING)
    @Column(name = "AUTHORITY")
    private RoleName authority;

    @Override
    public String getAuthority() {
        return "ROLE_" + authority;
    }

    public String getAuthorityName() {
        return authority.toString();
    }
}
