package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Channel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChannelService {

    List<Channel> findAll();

    Channel findById(String id);
}
