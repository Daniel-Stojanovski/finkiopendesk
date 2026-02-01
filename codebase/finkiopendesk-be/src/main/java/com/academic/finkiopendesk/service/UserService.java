package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.User;

import java.util.UUID;

public interface UserService {

    User findById(UUID id);

    User createStudent(String email);

    void activateUser(User user, String rawPassword);

}
