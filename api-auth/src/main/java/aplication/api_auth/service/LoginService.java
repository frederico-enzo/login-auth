package aplication.api_auth.service;
import aplication.api_auth.dto.LoginDto;
import aplication.api_auth.dto.UserDto;
import aplication.api_auth.model.User;
import aplication.api_auth.repository.LoginRepository;
import aplication.api_auth.security.JwtServiceGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


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
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                )
        );
        User user = repository.findByUsername(loginDTO.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return toUserDTO(user, jwtToken);
    }

    public UserDto registrar(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Criptografando a senha
        user.setRole(userDto.getRole()); // Definindo a função do usuário

        User savedUser = repository.save(user);

        String jwtToken = jwtService.generateToken(savedUser);

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