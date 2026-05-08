package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Vote;
import com.academic.finkiopendesk.service.VoteService;
import com.academic.finkiopendesk.web.dto.UserVoteProjection;
import com.academic.finkiopendesk.web.dto.VotesCountProjection;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://finkiopendesk.onrender.com")
@RestController
@RequestMapping("/api/votes")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping("/pid/{professionId}")
    public List<VotesCountProjection> getVotes(@PathVariable String professionId) {
        return voteService.getVotes(professionId);
    }

    @GetMapping("/pid/{professionId}/{userId}")
    public List<UserVoteProjection> getUserProfessionSubjectVotes(@PathVariable String professionId, @PathVariable String userId) {
        return voteService.getUserProfessionSubjectVotes(professionId, userId);
    }

    @GetMapping("/{userId}")
    public List<Vote> getUserVotes(@PathVariable String userId) {
        return voteService.getUserVotes(userId);
    }
}
