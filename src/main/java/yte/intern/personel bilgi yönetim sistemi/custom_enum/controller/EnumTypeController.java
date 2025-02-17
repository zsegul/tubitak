package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.EnumTypeWithEnumsDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.UpdateEnumTypeRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.EnumType;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.service.EnumService;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.service.EnumTypeService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/enumTypes")
@RequiredArgsConstructor
public class EnumTypeController {

    private final EnumTypeService enumTypeService;
    private final EnumService enumService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<String> getAllEnumTypes() {
        return enumTypeService.getAllEnumTypes().stream().map(EnumType::getName).collect(Collectors.toList());
    }

    @GetMapping("/withEnums")
    public List<EnumTypeWithEnumsDTO> getEnumTypesWithEnums() {
        return enumService.getEnumTypesWithEnums();
    }

    @PutMapping("/{type}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public EnumType updateEnumType(@RequestBody @Valid UpdateEnumTypeRequestDTO updateEnumTypeRequestDTO, @PathVariable String type) {
        return enumTypeService.updateEnumType(updateEnumTypeRequestDTO, type);
    }
}
