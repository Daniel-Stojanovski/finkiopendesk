package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Vote;
import com.academic.finkiopendesk.model.dto.VoteDto;
import com.academic.finkiopendesk.repository.VoteRepository;
import com.academic.finkiopendesk.service.VoteService;
import com.academic.finkiopendesk.web.dto.VotesCountProjection;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;

    public VoteServiceImpl(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public Vote vote(VoteDto dto, String userId) {
        UUID userUUID = UUID.fromString(userId);

        Optional<Vote> existing = voteRepository.findExact(userUUID, dto.getSubjectId(), dto.getProfessionId());

        if(existing.isPresent()) {
            Vote existingVote = existing.get();
            existingVote.setVote(dto.getVote());
            voteRepository.save(existingVote);
            return existingVote;
        } else {
            Vote newVote = new Vote();
            newVote.setUserId(userUUID);
            newVote.setSubjectId(dto.getSubjectId());
            newVote.setProfessionId(dto.getProfessionId());
            newVote.setVote(dto.getVote());
            voteRepository.save(newVote);
            return newVote;
        }
    }

    public List<VotesCountProjection> getVotes(String professionId) {
        return voteRepository.findByProfessionSubject(professionId);
    }
}