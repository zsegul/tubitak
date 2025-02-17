package yte.intern.personel.bilgi.yonetim.sistemi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class testController {
    @GetMapping
    public String test() {
        return "Merhabaaaa";
    }

}
