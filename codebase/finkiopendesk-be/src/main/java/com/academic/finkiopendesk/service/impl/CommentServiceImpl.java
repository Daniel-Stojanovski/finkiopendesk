package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.*;
import com.academic.finkiopendesk.model.dto.CommentDto;
import com.academic.finkiopendesk.repository.CommentRepository;
import com.academic.finkiopendesk.service.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    private final UserService userService;
    private final SubjectService subjectService;
    private final ProfessionService professionService;
    private final ChannelService channelService;

    public CommentServiceImpl(CommentRepository commentRepository, UserService userService, SubjectService subjectService, ProfessionService professionService, ChannelService channelService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.subjectService = subjectService;
        this.professionService = professionService;
        this.channelService = channelService;
    }

    @Override
    public List<Comment> findAll() { return commentRepository.findAll(); }

    @Override
    public Comment findById(String id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @Override
    public List<CommentDto> findSubjectDiscussionComments(String subjectDiscussionId) {
        SubjectDiscussion subjectDiscussion = subjectService.findDiscussionById(subjectDiscussionId);
        return subjectDiscussion.getComments().stream().map(CommentDto::fromEntity).toList();
    }

    @Override
    public List<CommentDto> findProfessionDiscussionComments(String professionDiscussionId) {
        ProfessionDiscussion professionDiscussion = professionService.findDiscussionById(professionDiscussionId);
        return professionDiscussion.getComments().stream().map(CommentDto::fromEntity).toList();
    }

    @Override
    public Comment createComment(CommentDto dto, String userId) {

        if (dto.getSubjectId() == null && dto.getProfessionId() == null) {
            throw new RuntimeException("Must provide subjectId or professionId");
        }

        User user = userService.findById(UUID.fromString(userId));

        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setType(dto.getType());
        comment.setUser(user);

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

        if (dto.getParentId() != null) {
            Comment parentComment = findById(dto.getParentId());
            comment.setParentComment(parentComment);
        }

        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> findCommentsByDiscussionContext(String channelId, String subjectDiscussionId, String professionDiscussionId) {
        return commentRepository.findCommentsByDiscussionContext(channelId, subjectDiscussionId, professionDiscussionId);
    }
}
