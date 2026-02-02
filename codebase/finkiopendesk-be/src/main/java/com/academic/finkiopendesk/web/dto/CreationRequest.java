package com.academic.finkiopendesk.web.dto;
public record CreationRequest(
        String email,
        String password
) {}