package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Channel;
import com.academic.finkiopendesk.model.dto.ChannelDto;
import com.academic.finkiopendesk.service.ChannelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/channels")
public class ChannelController {

    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping
    public List<Channel> getChannels() {
        return channelService.findAll();
    }

    @GetMapping("active")
    public List<Channel> getActiveChannels() {
        return channelService.findAllActive();
    }

    @GetMapping("inactive")
    public List<Channel> getInactiveChannels() {
        return channelService.findAllInactive();
    }

    @GetMapping("/cid/{id}")
    public ChannelDto getDiscussionByChannelId(@PathVariable String id) {
        return ChannelDto.fromEntity(channelService.findById(id));
    }
}
