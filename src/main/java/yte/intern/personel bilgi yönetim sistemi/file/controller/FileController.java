package yte.intern.personel.bilgi.yonetim.sistemi.file.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileRequest;
import yte.intern.personel.bilgi.yonetim.sistemi.file.dto.FileResponse;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.file.service.FileService;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.rmi.NoSuchObjectException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload/{id}")
    public FileResponse uploadFile(@ModelAttribute FileRequest fileRequest, @PathVariable Long id) throws IOException {
        FileDetails newFile = fileService.saveFile(fileRequest.getMultipartFile(), fileRequest.getDepartment(), id);
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/file/download/").
                path(newFile.getId().toString()).toUriString();
        fileService.setFileDetailsUri(newFile.getId(), fileUri);
        return new FileResponse(newFile.getId(), newFile.getFileName(), newFile.getFileType(), LocalDate.now().toString(), fileUri, newFile.getDepartment());
    }

    @PostMapping("/uploadMultipleFiles/{id}")
    public List<FileResponse> uploadMultipleFiles(@RequestParam("files") List<FileRequest> files, @PathVariable Long id) throws IOException {
        List<FileResponse> response = new ArrayList<>();
        for (var file : files) {
            response.add(uploadFile(file, id));
        }
        return response;
    }

    @PutMapping("/update/{id}")
    public FileResponse updateFile(@ModelAttribute FileRequest fileRequest, @PathVariable Long id) throws IOException {
        return fileService.updateFile(fileRequest, id);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) throws FileNotFoundException {
        return fileService.downloadFile(fileId);
    }

    @GetMapping("/allFiles/{id}")
    public List<FileResponse> getListOfFiles(@PathVariable Long id) throws NoSuchObjectException {
        return fileService.getListOfFiles(id);
    }

    @DeleteMapping("/delete/{id}")
    public List<FileResponse> deleteFile(@PathVariable Long id) throws FileNotFoundException {
        return fileService.deleteFile(id);
    }
}
