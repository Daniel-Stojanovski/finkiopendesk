package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Vote;
import com.academic.finkiopendesk.model.dto.VoteDto;


public interface VoteService {
    Vote vote(VoteDto vote, String userId);
}
