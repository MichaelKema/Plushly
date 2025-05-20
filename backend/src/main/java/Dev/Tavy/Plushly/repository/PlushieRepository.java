package Dev.Tavy.Plushly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Dev.Tavy.Plushly.model.Plushie;

public interface  PlushieRepository extends  JpaRepository<Plushie,Long>{
    List<Plushie> findBySource(String source);
    List<Plushie> findBySourceIn(List<String> sources);
    
}
