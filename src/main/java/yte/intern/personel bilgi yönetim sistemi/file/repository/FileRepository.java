package yte.intern.personel.bilgi.yonetim.sistemi.file.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileDetails, Long> {

    List<FileDetails> findAllByUserId(Long id);
}
