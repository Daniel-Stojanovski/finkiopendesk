package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.UserFavorite;
import com.academic.finkiopendesk.model.dto.UserFavoriteDto;
import com.academic.finkiopendesk.service.UserFavoriteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/favorites")
public class UserFavoriteController {

    private final UserFavoriteService userFavoriteService;

    public UserFavoriteController(UserFavoriteService userFavoriteService) {
        this.userFavoriteService = userFavoriteService;
    }

    @GetMapping("/{userId}")
    public List<UserFavorite> getUserFavorites(@PathVariable String userId){
        return userFavoriteService.getUserFavorites(userId);
    }

    @PostMapping("/{userId}/set")
    public UserFavorite setUserFavorite(@PathVariable String userId, @RequestBody UserFavoriteDto dto){
        return userFavoriteService.setFavorite(userId, dto.getTargetId(), dto.getTargetType());
    }
}
