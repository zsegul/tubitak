package yte.intern.personel.bilgi.yonetim.sistemi.security.configuration;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DatabasePopulator {

    private final UserPopulator userPopulator;

    @PostConstruct
    public void init() {
        userPopulator.initUsers();
    }
}