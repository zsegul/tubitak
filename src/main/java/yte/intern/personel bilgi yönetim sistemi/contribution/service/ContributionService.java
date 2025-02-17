package yte.intern.personel.bilgi.yonetim.sistemi.contribution.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto.ContributionRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.dto.ContributionResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity.Contribution;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.repository.ContributionRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.file.repository.FileRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;

import java.io.IOException;
import java.rmi.NoSuchObjectException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class ContributionService {

    private final ContributionRepository contributionRepository;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;

    @Autowired
    public ContributionService(ContributionRepository contributionRepository, UserRepository userRepository, FileRepository fileRepository) {
        this.contributionRepository = contributionRepository;
        this.userRepository = userRepository;
        this.fileRepository = fileRepository;
    }

    public List<String> getEventTypes() {
        return contributionRepository.findDistinctEventTypes();
    }

    public void updateContributionEventTypes(String oldEventType, String newEventType) {
        Set<Contribution> contributions = contributionRepository.findByEventType(oldEventType);
        contributions.forEach(contribution -> {
            contribution.setEventType(newEventType);
            contributionRepository.save(contribution);
        });
    }

    public ContributionResponse saveContribution(ContributionRequest contributionRequest, Long id) throws IOException {
        if(!userRepository.existsById(id)) {
            throw new NoSuchObjectException("User with id " + id + " does not exist");
        }

        Contribution contribution = new Contribution(contributionRequest.getEventType(), contributionRequest.getDescription(), contributionRequest.getLink());
        contributionRepository.save(contribution);

        saveFiles(contributionRequest.getFiles(), contribution);

        User user = userRepository.findById(id).get();
        user.addContribution(contribution);
        contribution.setUser(user);
        contributionRepository.save(contribution);
        userRepository.save(user);
        ContributionResponse contributionResponse = new ContributionResponse();
        contributionResponse.setId(contribution.getId());
        contributionResponse.setEventType(contribution.getEventType());
        contributionResponse.setDescription(contribution.getDescription());
        contributionResponse.setLink(contribution.getLink());
        List<FileResponse> fileResponses = new ArrayList<>();
        contributionRepository.findById(contribution.getId()).get().getAttachments().forEach(file -> {
            fileResponses.add(new FileResponse(file.getId(), file.getFileName(), file.getFileType(), file.getUploadDate().toString(), file.getFileUri(), file.getDepartment()));
        });
        contributionResponse.setFileResponseList(fileResponses);
        return contributionResponse;
    }

    public void saveFiles(List<MultipartFile> fileRequests, Contribution contribution) {

        if(fileRequests == null){
            return;
        }

        fileRequests.forEach(fileRequest -> {
            try {
                FileDetails newFile = new FileDetails(StringUtils.cleanPath(Objects.requireNonNull(fileRequest.getOriginalFilename())), fileRequest.getContentType(), LocalDate.now(), "", fileRequest.getBytes());
                fileRepository.save(newFile);
                String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/file/download/").
                        path(newFile.getId().toString()).toUriString();
                newFile.setFileUri(fileUri);
                newFile.setContribution(contribution);
                contribution.addAttachment(newFile);
                contributionRepository.save(contribution);
                fileRepository.save(newFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public List<ContributionResponse> updateContribution(ContributionRequest contributionRequest, Long id) throws IOException {
        if(!contributionRepository.existsById(id)){
            throw new NoSuchObjectException("Contribution with id: " + id + " was not found");
        }

        Contribution contribution = contributionRepository.findById(id).get();

        contribution.update(contribution.getEventType(), contributionRequest.getDescription(), contributionRequest.getLink());
        contributionRepository.save(contribution);

        saveFiles(contributionRequest.getFiles(), contribution);

        User user = userRepository.findById(contribution.getUser().getId()).get();
        user.addContribution(contribution);
        contribution.setUser(user);
        contributionRepository.save(contribution);
        userRepository.save(user);
        List<ContributionResponse> contributionResponses = new ArrayList<>();
        contributionRepository.findAllByUserId(contribution.getUser().getId()).forEach(cont -> {
            List<FileResponse> fileResponses = new ArrayList<>();
            contributionRepository.findById(cont.getId()).get().getAttachments().forEach(file -> {
                fileResponses.add(new FileResponse(file.getId(), file.getFileName(), file.getFileType(), file.getUploadDate().toString(), file.getFileUri(), file.getDepartment()));
            });
            contributionResponses.add(new ContributionResponse(cont.getId(), cont.getEventType(),
                    cont.getDescription(), cont.getLink(), fileResponses));
        });
        return contributionResponses;
    }

    public List<ContributionResponse> getAllContributions(Long id) throws NoSuchObjectException {
        if(!userRepository.existsById(id)) {
            throw new NoSuchObjectException("User with id " + id + " does not exist");
        }

        List<ContributionResponse> contributionResponseList = new ArrayList<>();
        User user = userRepository.findById(id).get();
        user.getContributions().forEach(contribution -> {
            List<FileResponse> fileResponseList = new ArrayList<>();
            contribution.getAttachments().forEach(file ->
                fileResponseList.add(new FileResponse(file.getId(), file.getFileName(), file.getFileType(), file.getUploadDate().toString(), file.getFileUri(), file.getDepartment()))
            );
            contributionResponseList.add(new ContributionResponse(contribution.getId(),
                    contribution.getEventType(), contribution.getDescription(),
                    contribution.getLink(), fileResponseList));
        });
        return contributionResponseList;
    }

    public List<ContributionResponse> deleteContribution(Long id) throws NoSuchObjectException {
        if(!contributionRepository.existsById(id)) {
            throw new NoSuchObjectException("Contribution with id " + id + " does not exist");
        }
        User user = contributionRepository.findById(id).get().getUser();
        Long userId = user.getId();
        user.removeContribution(contributionRepository.findById(id).get());
        contributionRepository.findById(id).get().setUser(null);
        contributionRepository.deleteById(id);
        List<ContributionResponse> contributionResponseList = new ArrayList<>();
        userRepository.findById(userId).get().getContributions().forEach(contribution -> {
            List<FileResponse> fileResponseList = new ArrayList<>();
            contribution.getAttachments().forEach(file ->
                    fileResponseList.add(new FileResponse(file.getId(), file.getFileName(), file.getFileType(), file.getUploadDate().toString(), file.getFileUri(), file.getDepartment()))
            );
            contributionResponseList.add(new ContributionResponse(contribution.getId(),
                    contribution.getEventType(), contribution.getDescription(),
                    contribution.getLink(), fileResponseList));
        });
        return contributionResponseList;
    }

    public void deleteContributionEventType(String name) {
        Set<Contribution> contributions = contributionRepository.findByEventType(name);
        contributions.forEach(contribution -> {
            contribution.setEventType(null);
            contributionRepository.save(contribution);
        });
    }
}
