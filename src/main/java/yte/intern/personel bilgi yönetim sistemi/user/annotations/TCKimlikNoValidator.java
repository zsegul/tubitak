package yte.intern.personel.bilgi.yonetim.sistemi.user.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TCKimlikNoValidator implements ConstraintValidator<TCKimlikNoValidation, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        if (value.length() != 11) {
            return false;
        }
        if (value.charAt(0) == '0') {
            return false;
        }
        int totalOdd = 0;
        int totalEven = 0;
        for (int i = 0; i < 9; i++) {
            int digit = Character.getNumericValue(value.charAt(i));
            if (i % 2 == 0) {
                totalOdd += digit;
            } else {
                totalEven += digit;
            }
        }
        int tenthDigit = Character.getNumericValue(value.charAt(9));
        int eleventhDigit = Character.getNumericValue(value.charAt(10));
        return (totalOdd * 7 - totalEven) % 10 == tenthDigit && (totalOdd + totalEven + tenthDigit) % 10 == eleventhDigit;
    }
}
