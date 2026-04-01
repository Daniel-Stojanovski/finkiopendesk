package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.Subject;
import com.academic.finkiopendesk.model.UserFavorite;
import com.academic.finkiopendesk.model.enums.DiscussionType;
import com.academic.finkiopendesk.repository.UserFavoriteRepository;
import com.academic.finkiopendesk.service.ProfessionService;
import com.academic.finkiopendesk.service.SubjectService;
import com.academic.finkiopendesk.service.UserFavoriteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserFavoriteServiceImpl implements UserFavoriteService {

    private final UserFavoriteRepository userFavoriteRepository;
    private final SubjectService subjectService;
    private final ProfessionService professionService;

    public UserFavoriteServiceImpl(UserFavoriteRepository userFavoriteRepository, SubjectService subjectService, ProfessionService professionService) {
        this.userFavoriteRepository = userFavoriteRepository;
        this.subjectService = subjectService;
        this.professionService = professionService;
    }

    @Override
    public List<UserFavorite> getUserFavorites(String userId) {
        UUID userUUID = UUID.fromString(userId);

        List<UserFavorite> userFavorites = userFavoriteRepository.findByUserId(userUUID);

        return userFavorites.stream().map(
            favoriteItem -> {
                if (DiscussionType.SUBJECT.name().equals(favoriteItem.getTargetType().toUpperCase())) {
                    Subject subject = subjectService.findById(favoriteItem.getTargetId());
                    favoriteItem.setTargetName(subject.getName());
                }
                if (DiscussionType.PROFESSION.name().equals(favoriteItem.getTargetType().toUpperCase())) {
                    Profession profession = professionService.findById(favoriteItem.getTargetId());
                    favoriteItem.setTargetName(profession.getName());
                }

                return favoriteItem;
            }).toList();
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
