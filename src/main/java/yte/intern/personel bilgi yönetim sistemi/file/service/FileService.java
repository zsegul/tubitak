package yte.intern.personel.bilgi.yonetim.sistemi.file.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.personel.bilgi.yonetim.sistemi.contribution.repository.ContributionRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.file.repository.FileRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.rmi.NoSuchObjectException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    private final ContributionRepository contributionRepository;

    @Autowired
    public FileService(FileRepository fileRepository, UserRepository userRepository, ContributionRepository contributionRepository) {
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.contributionRepository = contributionRepository;
    }

    public FileDetails saveFile(MultipartFile file, String department, Long id) throws IOException {

        if (!userRepository.existsById(id)) {
            throw new NoSuchObjectException("User with id: " + id + " does not exist");
        }
        FileDetails newFile = new FileDetails(StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename())), file.getContentType(), LocalDate.now(), "", department, file.getBytes());
        fileRepository.save(newFile);

        User user = userRepository.findById(id).get();
        newFile.setUser(user);
        user.addFile(newFile);
        userRepository.save(user);
        return fileRepository.save(newFile);
    }

    public FileResponse updateFile(FileRequest fileRequest, Long id) throws IOException {
        if(!fileRepository.existsById(id)) {
            throw new FileNotFoundException("File with id: " + id + " does not exist");
        }

        FileDetails file = fileRepository.findById(id).get();
        file.setFileName(fileRequest.getFileName());
        file.setFileType(fileRequest.getFileType());
        file.setUploadDate(LocalDate.parse(fileRequest.getUploadDate()));
        file.setFileUri(fileRequest.getFileUri());
        file.setDepartment(fileRequest.getDepartment());
        file.setFileData(fileRequest.getMultipartFile().getBytes());
        fileRepository.save(file);
        return convertFileDetailsToFileResponse(file);
    }

    @Transactional
    public List<FileResponse> getListOfFiles(Long id) throws NoSuchObjectException{
        if(!userRepository.existsById(id)) {
            throw new NoSuchObjectException("User with id: " + id + " does not exist");
        }

        List<FileResponse> fileResponseList = new ArrayList<>();
        userRepository.findById(id).get().getFiles().forEach(file ->
            fileResponseList.add(convertFileDetailsToFileResponse(file))
        );
        return fileResponseList;
    }

    @Transactional
    public ResponseEntity<Resource> downloadFile(Long fileId) throws FileNotFoundException {
        FileDetails file = fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("Dosya bulunamadı!"));

        // Determine the content type based on file extension or content
        String contentType = "application/octet-stream"; // Default to binary
        if (file.getFileName().endsWith(".pdf")) {
            contentType = "application/pdf";
        } else if (file.getFileName().endsWith(".txt")) {
            contentType = "text/plain";
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + file.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(new ByteArrayResource(file.getFileData()));
    }


    public void setFileDetailsUri(Long id, String uri) throws FileNotFoundException{
        if(!fileRepository.existsById(id)){
            throw new FileNotFoundException("File with id: " + id + " was not found");
        }
        FileDetails file = fileRepository.findById(id).get();
        file.setFileUri(uri);
        fileRepository.save(file);
    }

    public FileResponse convertFileDetailsToFileResponse(FileDetails file) {
        return new FileResponse(file.getId(), file.getFileName(), file.getFileType(), file.getUploadDate().toString(), file.getFileUri(), file.getDepartment());
    }

    public List<FileResponse> deleteFile(Long id) throws FileNotFoundException {
        if(!fileRepository.existsById(id)){
            throw new FileNotFoundException("File with id: " + id + " was not found");
        }

        FileDetails file = fileRepository.findById(id).get();
        User user = userRepository.findById(file.getUser().getId()).get();
        user.removeFile(file);
        file.setUser(null);
        userRepository.save(user);
        fileRepository.delete(file);
        List<FileResponse> fileResponseList = new ArrayList<>();
        user.getFiles().forEach(
                fileDetails ->
                        fileResponseList.add(convertFileDetailsToFileResponse(fileDetails))
        );
        return fileResponseList;
    }
}
