package yte.intern.personel.bilgi.yonetim.sistemi.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder

public class Department extends BaseEntity {
    private String name;


    @Builder.Default
    @OneToMany(mappedBy = "departmentOrgSch", cascade = CascadeType.ALL)
    private Set<User> employeesInThisDepartment = new HashSet<>();


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "institution_id")
    private Institution institution;


    public void addEmployee(User user) {
        employeesInThisDepartment.add(user);
        user.setDepartmentOrgSch(this);
    }

}
