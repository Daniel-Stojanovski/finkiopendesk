package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Program;
import com.academic.finkiopendesk.model.User;
import com.academic.finkiopendesk.model.UserFavorite;
import com.academic.finkiopendesk.service.EmailService;
import com.academic.finkiopendesk.service.ProgramService;
import com.academic.finkiopendesk.service.TokenService;
import com.academic.finkiopendesk.service.UserService;
import com.academic.finkiopendesk.web.dto.ActivationRequest;
import com.academic.finkiopendesk.web.dto.CreationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080"})
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final ProgramService programService;
    private final TokenService tokenService;
    private final EmailService emailService;

    public AuthController(UserService userService, ProgramService programService, TokenService tokenService, EmailService emailService) {
        this.userService = userService;
        this.programService = programService;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }

    @Transactional
    @PostMapping("/students/create")
    public ResponseEntity<?> createStudent(@RequestParam String email) {

        User user = userService.createStudent(email);
        String token = tokenService.generateActivationToken(user.getUserId());

        emailService.sendFormalActivationEmail(user, token);

        return ResponseEntity.ok(token);
    }

    @PostMapping("/students/activate")
    public ResponseEntity<?> activate(@RequestBody ActivationRequest request) {

        UUID userId = tokenService.validateAndExtractUserId(request.token());

        User user = userService.findById(userId);

        userService.activateUser(user, request.password());

        String jwt = tokenService.generateLoginToken(user);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/users/create")
    public ResponseEntity<?> createUser(@RequestBody CreationRequest request) {

        User user = userService.createUser(request.email(), request.password());
        String jwt = tokenService.generateLoginToken(user);

        return ResponseEntity.ok(jwt);
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

    @PostMapping("/user/program/{programId}")
    public ResponseEntity<?> setProgram(Authentication auth, @PathVariable String programId) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) auth;
        UUID userId = UUID.fromString(token.getToken().getSubject());
        User user = userService.findById(userId);
        Program program = programService.findById(programId);

        userService.setUserProgram(user, program);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/program")
    public ResponseEntity<?> removeProgram(Authentication auth) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) auth;
        UUID userId = UUID.fromString(token.getToken().getSubject());
        User user = userService.findById(userId);

        userService.removeUserProgram(user);
        return ResponseEntity.ok().build();
    }

}
