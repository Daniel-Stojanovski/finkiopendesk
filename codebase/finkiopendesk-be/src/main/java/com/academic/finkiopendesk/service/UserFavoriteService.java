package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.UserFavorite;

import java.util.List;

public interface UserFavoriteService {
    List<UserFavorite> getUserFavorites(String userId);
    UserFavorite setFavorite(String userId, String targetId, String targetType);
}
