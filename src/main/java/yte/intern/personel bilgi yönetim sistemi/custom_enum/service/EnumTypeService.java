package yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.controller.dto.UpdateEnumTypeRequestDTO;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.entity.EnumType;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository.EnumTypeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnumTypeService {
    private final EnumTypeRepository enumTypeRepository;

    public List<EnumType> getAllEnumTypes() {
        return enumTypeRepository.findAll();
    }

    public EnumType getEnumTypeByName(String name) {
        return enumTypeRepository.findByName(name);
    }

    public EnumType updateEnumType(UpdateEnumTypeRequestDTO updateEnumTypeRequestDTO, String type) {
        EnumType enumType = enumTypeRepository.findByName(type);
        if (enumType == null) {
            throw new RuntimeException("Enum type is not found");
        }
        enumType.setName(updateEnumTypeRequestDTO.name());
        return enumTypeRepository.save(enumType);
    }
}
