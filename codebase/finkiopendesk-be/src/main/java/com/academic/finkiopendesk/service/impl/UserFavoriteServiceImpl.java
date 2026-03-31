package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.UserFavorite;
import com.academic.finkiopendesk.repository.UserFavoriteRepository;
import com.academic.finkiopendesk.service.UserFavoriteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserFavoriteServiceImpl implements UserFavoriteService {

    private final UserFavoriteRepository userFavoriteRepository;

    public UserFavoriteServiceImpl(UserFavoriteRepository userFavoriteRepository) {
        this.userFavoriteRepository = userFavoriteRepository;
    }

    @Override
    public List<UserFavorite> getUserFavorites(String userId) {
        UUID userUUID = UUID.fromString(userId);
        return userFavoriteRepository.findByUserId(userUUID).stream().toList();
    }

    @Override
    public UserFavorite setFavorite(String userId, String targetId, String targetType) {
        UUID userUUID = UUID.fromString(userId);

        Optional<UserFavorite> existing = userFavoriteRepository.findExact(userUUID, targetId, targetType);

        if (existing.isPresent()) {
            userFavoriteRepository.delete(existing.get());
            return existing.get();
        }
        else {
            UserFavorite userFavorite = new UserFavorite();
            userFavorite.setUserId(userUUID);
            userFavorite.setTargetId(targetId);
            userFavorite.setTargetType(targetType);
            userFavoriteRepository.save(userFavorite);
            return userFavorite;
        }
    }
}
