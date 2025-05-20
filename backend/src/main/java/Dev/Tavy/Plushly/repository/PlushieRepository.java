package Dev.Tavy.Plushly.repository;

import Dev.Tavy.Plushly.model.Plushie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public class PlushieRepository extends  JpaRepository<Plushie,Long>{
    List<Plushie> findBySource(String source);
    List<Plushie> findBySourceIn(List<String> sources);
    
}
