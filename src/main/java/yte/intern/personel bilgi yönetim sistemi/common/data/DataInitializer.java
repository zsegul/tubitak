package yte.intern.personel.bilgi.yonetim.sistemi.common.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import yte.intern.personel.bilgi.yonetim.sistemi.custom_enum.repository.CustomEnumRepository;
import yte.intern.personel.bilgi.yonetim.sistemi.user.entity.User;
import yte.intern.personel.bilgi.yonetim.sistemi.user.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, CustomEnumRepository customEnumRepository) {
        return args -> {
            try {
                // Load the file from the classpath
                Resource resource = new ClassPathResource("imagess.txt");
                Path pathsFile = resource.getFile().toPath();
                List<String> base64Strings = Files.readAllLines(pathsFile);

                // Ensure we have at least one image
                if (base64Strings.isEmpty()) {
                    throw new IllegalArgumentException("At least one Base64 image string is required in the imagess.txt file.");
                }

                // Decode the Base64 string to bytes
                byte[] image1 = Base64.getDecoder().decode(base64Strings.get(0)); // Use the first image string
                byte[] image2 = Base64.getDecoder().decode(base64Strings.get(1)); // Use the second image string
                // Create dummy users
                User user1 = new User();
                user1.setFullName("John Doe");
                user1.setDepartment(customEnumRepository.findById(2L).get());
                user1.setTitle(customEnumRepository.findById(3L).get());
                user1.setTask(customEnumRepository.findById(26L).get());
                user1.setEmail("john.doe@example.com");
                user1.setPhone("+90 555 444 3322");
                user1.setBirthDate(LocalDate.now()); // Today’s date
                user1.setImage(image1); // Set dummy image

                User user2 = new User();
                user2.setFullName("Wan Dogh");
                user2.setDepartment(customEnumRepository.findById(1L).get());
                user2.setTitle(customEnumRepository.findById(4L).get());
                user2.setTask(customEnumRepository.findById(25L).get());
                user2.setEmail("wan.dogh@example.com");
                user2.setPhone("+90 555 555 3322");
                user2.setBirthDate(LocalDate.now()); // Today’s date
                user2.setImage(image2); // Set the same image for the second user

                // Save users to the database
                userRepository.save(user1);
                userRepository.save(user2);

            } catch (IOException e) {
                e.printStackTrace();
            }
        };
    }
}
