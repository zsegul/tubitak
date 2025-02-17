package yte.intern.personel.bilgi.yonetim.sistemi.user.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Institution extends BaseEntity {

    private String name;


    @ManyToOne
    @JoinColumn(name = "parent_institution_id")
    @JsonIgnore
    private Institution parentInstitution;


    @OneToMany(mappedBy = "parentInstitution", cascade = CascadeType.ALL)
    @JsonBackReference
    @JsonManagedReference
    @Builder.Default
    private Set<Institution> childInstitutions = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL)
    private Set<Department> departments = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "institutionOrgSch", cascade = CascadeType.ALL)
    private Set<User> employeesInThisInstitution = new HashSet<>();



    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "organization_id")
    private Organization organization;

    public void addChildInstitution(Institution institution) {
        childInstitutions.add(institution);
        institution.setParentInstitution(this);
    }

    public void addDepartment(Department department) {
        departments.add(department);
        department.setInstitution(this);
    }

    public void addEmployee(User user) {
        employeesInThisInstitution.add(user);
        user.setInstitutionOrgSch(this);
    }



}
