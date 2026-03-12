package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Vote;
import lombok.Data;

@Data
public class VoteDto {
    private String voteId;
    private String subjectId;
    private String professionId;
    private Integer vote;

    public static VoteDto fromEntity(Vote vote) {
        VoteDto dto = new VoteDto();
        dto.setVoteId(vote.getVoteId());
        dto.setSubjectId(vote.getSubjectId());
        dto.setProfessionId(vote.getProfessionId());
        dto.setVote(vote.getVote());
        return dto;
    }
}
