package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Channel;
import com.academic.finkiopendesk.repository.ChannelRepository;
import com.academic.finkiopendesk.service.ChannelService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;

    public ChannelServiceImpl(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    @Override
    public List<Channel> findAll() {
        return channelRepository.findAll();
    }

    @Override
    public Channel findById(String id) {
        return channelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
    }
}
