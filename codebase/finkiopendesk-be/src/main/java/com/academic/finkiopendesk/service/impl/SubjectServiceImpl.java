package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.*;
import com.academic.finkiopendesk.repository.SubjectRepository;
import com.academic.finkiopendesk.service.ProfessionService;
import com.academic.finkiopendesk.service.SubjectService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;
    private final ProfessionService professionService;

    public SubjectServiceImpl(SubjectRepository subjectRepository, ProfessionService professionService) {
        this.subjectRepository = subjectRepository;
        this.professionService = professionService;
    }

    @Override
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    @Override
    public Subject findById(String id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    @Override
    public List<Subject> findSubjectsByProfessionId(String professionId) {
        Profession profession = professionService.findById(professionId);

        List<Subject> notRecommended =
                subjectRepository.findAllNotRecommendedForProfession(professionId);

        List<Subject> result = new ArrayList<>();
        result.addAll(profession.getRecommendedSubjects());
        result.addAll(notRecommended);

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Channel> findChannelsBySubjectId(String subjectId) {

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return subject.getSubjectTags()
                .stream()
                .map(SubjectTag::getChannel)
                .filter(Objects::nonNull)
                .toList();
    }
    @Override
    @Transactional(readOnly = true)
    public List<Channel> findActiveChannelsBySubjectId(String subjectId) {

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return subject.getSubjectTags()
                .stream()
                .filter(SubjectTag::isActive)
                .map(SubjectTag::getChannel)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Channel> findInactiveChannelsBySubjectId(String subjectId) {

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return subject.getSubjectTags()
                .stream()
                .filter(tag -> Boolean.FALSE.equals(tag.isActive()))
                .map(SubjectTag::getChannel)
                .filter(Objects::nonNull)
                .toList();
    }


    @Override
    @Transactional(readOnly = true)
    public SubjectDiscussion findDiscussionBySubjectId(String subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        SubjectDiscussion discussion = subject.getDiscussion();

        if (discussion == null) {
            throw new RuntimeException("Discussion not found for subject");
        }

        return discussion;
    }

    @Override
    @Transactional(readOnly = true)
    public SubjectDiscussion findDiscussionById(String discussionId) {

        Subject subject = subjectRepository.findByDiscussionId(discussionId)
                .orElseThrow(() -> new RuntimeException("Subject not found by discussion ID"));

        SubjectDiscussion discussion = subject.getDiscussion();

        if (discussion == null) {
            throw new RuntimeException("Discussion not found for subject");
        }

        return discussion;
    }
}
