package aplication.api_auth.repository;

import java.util.Optional;
import aplication.api_auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<User, Long>{
    public Optional<User> findByUsername(String login);

}