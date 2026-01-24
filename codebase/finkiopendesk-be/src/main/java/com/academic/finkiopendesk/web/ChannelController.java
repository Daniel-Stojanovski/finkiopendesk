package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Channel;
import com.academic.finkiopendesk.service.ChannelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
