package yte.intern.personel.bilgi.yonetim.sistemi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test3")
public class testcontroller2 {
    @GetMapping
    public String test() throws InterruptedException {
        Thread.sleep(2000000000);
        return "Merhabaaaa";
    }
}
