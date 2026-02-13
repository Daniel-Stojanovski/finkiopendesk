package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Channel;
import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.ProfessionDiscussion;
import com.academic.finkiopendesk.model.SubjectDiscussion;
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
    public Comment createComment(Comment comment) {
        comment.setType(comment.getType());
        comment.setContent(comment.getContent());

        if (comment.getSubjectDiscussion() != null) {
            SubjectDiscussion sd = subjectService
                    .findDiscussionById(comment.getSubjectDiscussion().getSubjectDiscussionId());
            comment.setSubjectDiscussion(sd);
        }

        if (comment.getProfessionDiscussion() != null) {
            ProfessionDiscussion pd = professionService
                    .findDiscussionById(comment.getProfessionDiscussion().getProfessionDiscussionId());
            comment.setProfessionDiscussion(pd);
        }

        if (comment.getChannel() != null) {
            Channel channel = channelService
                    .findById(comment.getChannel().getChannelId());
            comment.setChannel(channel);
        }

        return commentRepository.save(comment);
    }
}
