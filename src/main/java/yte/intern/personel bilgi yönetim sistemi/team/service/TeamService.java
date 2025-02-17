package yte.intern.personel.bilgi.yonetim.sistemi.team.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.personel.bilgi.yonetim.sistemi.team.repository.TeamRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    public List<String> getDistinctTeamNames() {
        return teamRepository.findDistinctTeamNames();
    }
}
