package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.*;
import com.academic.finkiopendesk.model.dto.CommentDto;
import com.academic.finkiopendesk.repository.CommentRepository;
import com.academic.finkiopendesk.service.ChannelService;
import com.academic.finkiopendesk.service.CommentService;
import com.academic.finkiopendesk.service.ProfessionService;
import com.academic.finkiopendesk.service.SubjectService;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    private final SubjectService subjectService;
    private final ProfessionService professionService;
    private final ChannelService channelService;

    public CommentServiceImpl(CommentRepository commentRepository, SubjectService subjectService, ProfessionService professionService, ChannelService channelService) {
        this.commentRepository = commentRepository;
        this.subjectService = subjectService;
        this.professionService = professionService;
        this.channelService = channelService;
    }

    @Override
    public Comment createComment(CommentDto dto) {

        if (dto.getSubjectId() == null && dto.getProfessionId() == null) {
            throw new RuntimeException("Must provide subjectId or professionId");
        }

        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setType(dto.getType());

        if (dto.getSubjectId() != null) {
            Subject subject =
                    subjectService.findById(dto.getSubjectId());
            SubjectDiscussion discussion = subject.getDiscussion();
            comment.setSubjectDiscussion(discussion);
        }

        if (dto.getProfessionId() != null) {
            Profession profession =
                    professionService.findById(dto.getProfessionId());
            ProfessionDiscussion discussion = profession.getDiscussion();
            comment.setProfessionDiscussion(discussion);
        }

        if (dto.getChannelId() != null) {
            Channel channel =
                    channelService.findById(dto.getChannelId());
            comment.setChannel(channel);
        }

        return commentRepository.save(comment);
    }
}
