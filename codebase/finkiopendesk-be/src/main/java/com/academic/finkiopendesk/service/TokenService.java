package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.User;
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
public class TokenService {

    private final Key activationKey;
    private final Key loginKey;

    public TokenService(
//            @Value("${ACTIVATION_TOKEN_SECRET}") String secret
    ) {
        this.activationKey = Keys.hmacShaKeyFor(
//                Decoders.BASE64.decode(secret)
                Decoders.BASE64.decode("q9H3FJY8cX0M1kZrQm2T8eP5VdK6A7bLwS4N0uR9yIs=")
        );
        this.loginKey = Keys.hmacShaKeyFor(
                Decoders.BASE64.decode("s6AH218hsa09ha0i9zxT6LAS2vgd7aIoa9uXAW71zaX=")
        );
    }

    public String generateActivationToken(UUID userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("type", "ACTIVATION")
                .setExpiration(
                        Date.from(Instant.now().plus(30, ChronoUnit.MINUTES))
                )
                .signWith(activationKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateLoginToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUserId().toString())
                .claim("email", user.getEmail())
                .claim("student", user.isStudent())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(
                        Date.from(Instant.now().plus(1, ChronoUnit.DAYS))
                )
                .signWith(loginKey, SignatureAlgorithm.HS256)
                .compact();
    }


    public UUID validateAndExtractUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(activationKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (!"ACTIVATION".equals(claims.get("type"))) {
            throw new RuntimeException("Invalid token");
        }

        return UUID.fromString(claims.getSubject());
    }
}
