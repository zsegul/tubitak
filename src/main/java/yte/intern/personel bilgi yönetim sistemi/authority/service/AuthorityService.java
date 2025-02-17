package yte.intern.personel.bilgi.yonetim.sistemi.authority.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.Authority;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.entity.RoleName;
import yte.intern.personel.bilgi.yonetim.sistemi.authority.repository.AuthorityRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.exception.NotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorityService {
    private final AuthorityRepository authorityRepository;

    public List<Authority> getAllAuthorities() {
        return authorityRepository.findAll();
    }

    public Authority getCreateAuthoritory(String roleNameString) {
        try {
            RoleName roleName = RoleName.valueOf(roleNameString);
            return authorityRepository.findByAuthority(roleName)
                    .orElseGet(() -> {
                        Authority newAuthority = new Authority(roleName);
                        authorityRepository.save(newAuthority);
                        return newAuthority;
                    });
        } catch (IllegalArgumentException e) {
            throw new NotFoundException("Role not found");
        }
    }
}
