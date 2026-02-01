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
    public User createStudent(String email) {
        validateStudentEmail(email);
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

    private void validateStudentEmail(String email) {
        if(email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }

        if(!email.toLowerCase().endsWith("@student.finki.ukim.mk")) {
            throw new IllegalArgumentException("Email must be a valid student email (@student.finki.ukim.mk)");
        }

        if(userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }
    }
}
