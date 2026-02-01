package com.academic.finkiopendesk.web.dto;
public record ActivationRequest(
        String token,
        String password
) {}