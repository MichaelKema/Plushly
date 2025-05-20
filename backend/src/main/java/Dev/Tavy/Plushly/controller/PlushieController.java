package Dev.Tavy.Plushly.controller;
import java.util.List;

import Dev.Tavy.Plushly.model.Plushie;
import Dev.Tavy.Plushly.repository.PlushieRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plushies")
@CrossOrigin(origins = "*")
public class PlushieController{
    
    private final PlushieRepository plushieRepository;

    public PlushieController(PlushieRepository plushieRepository) {
        this.plushieRepository = plushieRepository;
    }
    @GetMapping
    public List<Plushie> getPlushies(@RequestParam(required = false) String source) {
        if (source != null) {
            return plushieRepository.findBySource(source.toLowerCase());

        } else{
            return plushieRepository.findBySourceIn(List.of("amazon","walmart"));
        }
    }
}