package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.*;
import com.academic.finkiopendesk.repository.ProfessionRepository;
import com.academic.finkiopendesk.service.ProfessionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProfessionServiceImpl implements ProfessionService {

    private final ProfessionRepository professionRepository;

    public ProfessionServiceImpl(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    @Override
    public List<Profession> findAll() {
        return professionRepository.findAll();
    }

    @Override
    public Profession findById(String id) {
        return professionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profession not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public ProfessionDiscussion findDiscussionByProfessionId(String professionId) {
        Profession profession = professionRepository.findById(professionId)
                .orElseThrow(() -> new RuntimeException("Profession not found"));

        ProfessionDiscussion discussion = profession.getDiscussion();

        if (discussion == null) {
            throw new RuntimeException("Discussion not found for profession");
        }

        return discussion;
    }

    @Override
    public ProfessionDiscussion findDiscussionById(String professionDiscussionId) {
        Profession profession = professionRepository.findByDiscussionId(professionDiscussionId)
                .orElseThrow(() -> new RuntimeException("Profession not found by discussion ID"));

        ProfessionDiscussion discussion = profession.getDiscussion();

        if (discussion == null) {
            throw new RuntimeException("Discussion not found for profession");
        }

        return discussion;
    }
}
