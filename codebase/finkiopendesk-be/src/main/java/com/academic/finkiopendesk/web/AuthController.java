package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.User;
import com.academic.finkiopendesk.service.ActivationTokenService;
import com.academic.finkiopendesk.service.UserService;
import com.academic.finkiopendesk.web.dto.ActivationRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final ActivationTokenService tokenService;

    public AuthController(UserService userService, ActivationTokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/students/create")
    public ResponseEntity<Void> createStudent(@RequestParam String email) {

        User user = userService.createStudent(email);
        String token = tokenService.generateToken(user.getUserId());

        URI redirect = URI.create(
                "http://localhost:8080/auth/students/activate?token=" + token
        );

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(redirect)
                .build();
    }

    @PostMapping("/students/activate")
    public ResponseEntity<?> activate(@RequestBody ActivationRequest request) {

        UUID userId = tokenService.validateAndExtractUserId(request.token());

        User user = userService.findById(userId);

        userService.activateUser(user, request.password());

        return ResponseEntity.ok("Account activated");
    }
}
