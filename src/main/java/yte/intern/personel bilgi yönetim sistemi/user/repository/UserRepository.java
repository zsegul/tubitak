package yte.intern.personel.bilgi.yonetim.sistemi.user.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAllByFullName(String fullName, Pageable pageable);

    Optional<User> findByUsername(String name);

    Optional<User> findByTCKimlikNo(String TCKimlikNo);

    Page<User> findAll(Specification<User> specification, Pageable pageable);

    @Query("SELECT u FROM User u WHERE MONTH(u.birthDate) = :currentMonth")
    List<User> findUsersWithBirthdaysInMonth(@Param("currentMonth") int currentMonth);

    List<User> findAllByDepartmentOrgSchIsNotNullOrInstitutionOrgSchIsNotNull();

    @Query("SELECT u FROM User u WHERE u.staff.id = :id OR u.title.id = :id OR u.department.id = :id " +
            "OR u.projectInWork.id = :id OR u.task.id = :id OR u.staffType.id = :id OR u.typeOfWork.id = :id " +
            "OR u.workStatus.id = :id")
    List<User> findByCustomEnumId(@Param("id") Long id);
}