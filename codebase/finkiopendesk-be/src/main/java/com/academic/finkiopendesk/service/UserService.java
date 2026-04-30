package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Program;
import com.academic.finkiopendesk.model.User;

import java.util.UUID;

public interface UserService {

    User findById(UUID id);

    User findByEmail(String id);

    User createStudent(String email);

    void activateUser(User user, String rawPassword);

    User createUser(String email, String rawPassword);

    User authenticateUser(String email, String rawPassword);

    User setUserProgram(User user, Program program);
    User removeUserProgram(User user);

}
