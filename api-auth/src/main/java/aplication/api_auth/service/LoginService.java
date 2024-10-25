package aplication.api_auth.service;

import aplication.api_auth.dto.LoginDto;
import aplication.api_auth.dto.UserDto;
import aplication.api_auth.model.User;
import aplication.api_auth.repository.LoginRepository;
import aplication.api_auth.security.JwtServiceGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository repository;
    @Autowired
    private JwtServiceGenerator jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserDto logar(LoginDto loginDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getUsername(),
                            loginDTO.getPassword()
                    )
            );
            User user = repository.findByUsername(loginDTO.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

            String jwtToken = jwtService.generateToken(user);
            return toUserDTO(user, jwtToken);

        } catch (AuthenticationException e) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }
    }

    public UserDto registrar(UserDto userDto) {
        // Verificar se o username já está em uso
        Optional<User> existingUser = repository.findByUsername(userDto.getUsername());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Nome de usuário já está em uso");
        }

        // Criar novo usuário
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Criptografando a senha
        user.setRole(userDto.getRole());

        User savedUser = repository.save(user);

        // Gerar token JWT para o usuário recém-registrado
        String jwtToken = jwtService.generateToken(savedUser);

        // Retornar o UserDto sem a senha
        return toUserDTO(savedUser, jwtToken);
    }

    private UserDto toUserDTO(User user, String token) {
        UserDto userDTO = new UserDto();
        userDTO.setId(user.getId());
        userDTO.setRole(user.getRole());
        userDTO.setToken(token);
        userDTO.setUsername(user.getUsername());
        return userDTO;
    }
}
