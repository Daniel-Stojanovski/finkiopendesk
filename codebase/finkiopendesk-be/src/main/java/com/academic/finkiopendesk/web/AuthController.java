package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.User;
import com.academic.finkiopendesk.service.TokenService;
import com.academic.finkiopendesk.service.UserService;
import com.academic.finkiopendesk.web.dto.ActivationRequest;
import com.academic.finkiopendesk.web.dto.CreationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080"})
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final TokenService tokenService;

    public AuthController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/students/create")
    public ResponseEntity<?> createStudent(@RequestParam String email) {

        User user = userService.createStudent(email);
        String token = tokenService.generateActivationToken(user.getUserId());

        return ResponseEntity.ok(token);
    }

    @PostMapping("/students/activate")
    public ResponseEntity<?> activate(@RequestBody ActivationRequest request) {

        UUID userId = tokenService.validateAndExtractUserId(request.token());

        User user = userService.findById(userId);

        userService.activateUser(user, request.password());

        return ResponseEntity.ok("Account activated");
    }

    @PostMapping("/users/create")
    public ResponseEntity<?> createUser(@RequestBody CreationRequest request) {

        userService.createUser(request.email(), request.password());

        return ResponseEntity.ok("Account created");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CreationRequest request) {

        User user = userService.authenticateUser(
                request.email(),
                request.password()
        );

        String jwt = tokenService.generateLoginToken(user);

        return ResponseEntity.ok(jwt);
    }

    @GetMapping("/user")
    public User getUser(Authentication auth) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) auth;
        String userId = token.getToken().getSubject();

        return userService.findById(UUID.fromString(userId));
    }

}
