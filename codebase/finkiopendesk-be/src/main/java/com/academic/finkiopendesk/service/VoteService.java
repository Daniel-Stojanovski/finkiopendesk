package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Vote;
import com.academic.finkiopendesk.model.dto.VoteDto;
import com.academic.finkiopendesk.web.dto.VotesCountProjection;

import java.util.List;


public interface VoteService {
    Vote vote(VoteDto vote, String userId);
    List<VotesCountProjection> getVotes(String professionId);
}
