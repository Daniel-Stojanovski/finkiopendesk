package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.NotificationGroup;
import com.academic.finkiopendesk.model.dto.NotificationGroupDto;
import com.academic.finkiopendesk.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<NotificationGroup> getNotifications() {
        return notificationService.findAllNotifications();
    }

    @GetMapping("/{userId}")
    public List<NotificationGroupDto> getUserNotifications(@PathVariable String userId) {
        return notificationService.findNotificationsByUserId(UUID.fromString(userId));
    }

    @PostMapping("/event/{eventId}/read")
    public void markEventRead(@PathVariable String eventId) {
        notificationService.markEventRead(eventId);
    }

    @PostMapping("/group/{groupId}/read")
    public void markGroupRead(@PathVariable String groupId) {
        notificationService.markGroupRead(groupId);
    }
}