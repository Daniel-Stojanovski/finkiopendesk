package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.service.VoteService;
import com.academic.finkiopendesk.web.dto.VotesCountProjection;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080"})
@RestController
@RequestMapping("/api/votes")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping("/{professionId}")
    public List<VotesCountProjection> getVotes(@PathVariable String professionId) {
        return voteService.getVotes(professionId);
    }
}
