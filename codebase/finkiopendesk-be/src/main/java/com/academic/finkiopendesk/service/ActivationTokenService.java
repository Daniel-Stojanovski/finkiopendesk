package com.academic.finkiopendesk.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
public class ActivationTokenService {

    private final Key key;

    public ActivationTokenService(
//            @Value("${ACTIVATION_TOKEN_SECRET}") String secret
    ) {
        this.key = Keys.hmacShaKeyFor(
//                Decoders.BASE64.decode(secret)
                Decoders.BASE64.decode("q9H3FJY8cX0M1kZrQm2T8eP5VdK6A7bLwS4N0uR9yIs=")
        );
    }

    public String generateToken(UUID userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("type", "ACTIVATION")
                .setExpiration(
                        Date.from(Instant.now().plus(30, ChronoUnit.MINUTES))
                )
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public UUID validateAndExtractUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (!"ACTIVATION".equals(claims.get("type"))) {
            throw new RuntimeException("Invalid token");
        }

        return UUID.fromString(claims.getSubject());
    }
}
