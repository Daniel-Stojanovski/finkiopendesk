package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Vote;
import com.academic.finkiopendesk.model.dto.VoteDto;
import com.academic.finkiopendesk.web.dto.UserVoteProjection;
import com.academic.finkiopendesk.web.dto.VotesCountProjection;

import java.util.List;
import java.util.UUID;


public interface VoteService {
    Vote vote(VoteDto vote, String userId);
    List<VotesCountProjection> getVotes(String professionId);
    List<UserVoteProjection> getUserProfessionSubjectVotes(String professionId, String userId);
    List<Vote> getUserVotes(String userId);
}
