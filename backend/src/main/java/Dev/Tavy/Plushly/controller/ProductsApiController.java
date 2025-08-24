package Dev.Tavy.Plushly.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ProductsApiController {

    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/api/products")
    public List<Map<String, Object>> getProducts() {
        // Allow overriding path via environment variable for flexibility in production
        String env = System.getenv("PRODUCTS_JSON_PATH");
        Path p;
        if (env != null && !env.isBlank()) {
            p = Paths.get(env);
        } else {
            // default: expect frontend/public/products.json relative to repo root
            p = Paths.get(System.getProperty("user.dir")).resolve("../frontend/public/products.json").normalize();
        }

        try {
            byte[] raw = Files.readAllBytes(p);
            return mapper.readValue(raw, new TypeReference<List<Map<String, Object>>>() {});
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not read products file: " + p.toString(), e);
        }
    }
}
