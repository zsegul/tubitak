package yte.intern.personel.bilgi.yonetim.sistemi.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.project.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findByProjectName(String projectName);
}
