package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.User;
import com.academic.finkiopendesk.repository.UserRepository;
import com.academic.finkiopendesk.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    @Override
    public User createStudent(String email) {
        validateStudent(email);
        User user = new User();
        user.setEmail(email);
        user.setStudent(true);
        user.setEnabled(false);
        return userRepository.save(user);
    }

    @Override
    public void activateUser(User user, String rawPassword) {
        if (user.isEnabled() || user.getPassword() != null) {
            throw new IllegalStateException("User already activated");
        }
        user.setPassword(encoder.encode(rawPassword));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public void createUser(String email, String rawPassword) {
        validateUser(email);
        User user = new User();
        user.setEmail(email);
        user.setPassword(encoder.encode(rawPassword));
        user.setStudent(false);
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public User authenticateUser(String email, String rawPassword) {
        User user = findByEmail(email);
        validatePassword(rawPassword, user);
        validateUserData(user);
        return user;
    }


    private void validateEmail(String email) {
        if(email == null || email.isBlank()) {
            throw new IllegalArgumentException("Provided e-mail cannot be empty");
        }

        if(userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("User with the provided e-mail address already exists");
        }
    }

    private void validateStudentEmail(String email, Boolean evaluateAs) {
        if(evaluateAs && !email.toLowerCase().endsWith("@student.finki.ukim.mk")) {
            throw new IllegalArgumentException("Provided e-mail must be a valid student e-mail address (@student.finki.ukim.mk)");
        }
        if(!evaluateAs && email.toLowerCase().endsWith("@student.finki.ukim.mk")) {
            throw new IllegalArgumentException("Provided e-mail should not be a student e-mail address (@student.finki.ukim.mk)");
        }
    }

    private void validateStudent(String email) {
        validateEmail(email);
        validateStudentEmail(email, true);
    }

    private void validateUser(String email) {
        validateEmail(email);
        validateStudentEmail(email, false);
    }

    private void validatePassword(String rawPassword, User user) {
        if (!encoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
    }

    private void validateUserData(User user) {
        if (!user.isEnabled()) {
            throw new RuntimeException("User not activated");
        }
    }
}
