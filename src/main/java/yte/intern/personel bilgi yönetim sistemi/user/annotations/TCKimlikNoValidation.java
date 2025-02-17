package yte.intern.personel.bilgi.yonetim.sistemi.user.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TCKimlikNoValidator.class)
public @interface TCKimlikNoValidation {

    String message() default "TC kimlik numarası formatı uygun değildir";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}