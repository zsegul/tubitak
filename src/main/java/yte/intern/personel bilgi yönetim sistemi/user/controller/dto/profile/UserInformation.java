package yte.intern.personel.bilgi.yonetim.sistemi.user.controller.dto.profile;

public record UserInformation(
        String ad,
        String soyad,
        String tcKimlikNo,
        String cinsiyet,
        String akademikUnvan,
        String email,
        String dogumTarihi,
        String kanGrubu,
        String telefon,
        String aracPlakasi,
        String acilDurumKisi,
        String acilDurumKisiTelefon,
        String ikametgahAdresi
) {
}