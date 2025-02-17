package yte.intern.personel.bilgi.yonetim.sistemi.project.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.personel.bilgi.yonetim.sistemi.project.entity.Project;
import yte.intern.personel.bilgi.yonetim.sistemi.project.repository.ProjectRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Project getProjectByName(String projectName) {
        return projectRepository.findByProjectName(projectName);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void updateProjectName(String oldProjectName, String newProjectName) {
        Project project = projectRepository.findByProjectName(oldProjectName);
        project.setProjectName(newProjectName);
        projectRepository.save(project);
    }
}
