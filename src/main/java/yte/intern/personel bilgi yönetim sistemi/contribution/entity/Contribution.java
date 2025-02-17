package yte.intern.personel.bilgi.yonetim.sistemi.contribution.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.personel.bilgi.yonetim.sistemi.common.entity.BaseEntity;
import yte.intern.personel.bilgi.yonetim.sistemi.file.entity.FileDetails;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CONTRIBUTION")
public class Contribution extends BaseEntity {

    private String eventType;
    private String description;
    private String link;

    @OneToMany(mappedBy = "contribution", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<FileDetails> attachments = new HashSet<>();

    @ManyToOne
    private User user;

    public Contribution(String eventType, String description, String link) {
        this.eventType = eventType;
        this.description = description;
        this.link = link;
    }

    public void update(String eventType, String description, String link) {
        this.eventType = eventType;
        this.description = description;
        this.link = link;
        removeAllAttachments();
    }

    public void addAttachment(FileDetails fileDetails) {
        this.attachments.add(fileDetails);
    }

    public void removeAllAttachments() {
        this.attachments.clear();
    }
}
