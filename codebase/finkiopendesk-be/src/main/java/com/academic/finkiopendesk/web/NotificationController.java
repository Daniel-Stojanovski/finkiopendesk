package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.service.NotificationService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
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