package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.AddEnumRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.UpdateEnumsRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.CustomEnum;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.service.EnumService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/enums")
public class CustomEnumController {
    private final EnumService enumService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<CustomEnum> getAllEnums() {
        return enumService.getAllEnums();
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<CustomEnum>> updateEnums(@RequestBody @Valid List <UpdateEnumsRequestDTO> updateEnumsRequestDTO) {
        return ResponseEntity.ok(enumService.updateEnums(updateEnumsRequestDTO));
    }

    @GetMapping("/{type}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<CustomEnum>> getEnumsByType(@PathVariable String type) {
        return ResponseEntity.ok(enumService.getEnumsByType(type));
    }

    @PostMapping("/{type}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<CustomEnum> addEnum(@RequestBody @Valid AddEnumRequestDTO addEnumRequestDTO, @PathVariable String type) {
        CustomEnum addedCustomEnum = enumService.addEnum(addEnumRequestDTO, type);
        return ResponseEntity.ok(addedCustomEnum);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> deleteEnum(@PathVariable Long id) {
        enumService.deleteEnum(id);
        return ResponseEntity.ok("Enum deleted successfully");
    }
}
