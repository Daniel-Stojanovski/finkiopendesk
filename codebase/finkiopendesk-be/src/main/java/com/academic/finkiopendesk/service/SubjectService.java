package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Channel;
import com.academic.finkiopendesk.model.Subject;
import com.academic.finkiopendesk.model.SubjectDiscussion;

import java.util.List;

public interface SubjectService {
    List<Subject> findAll();

    Subject findById(String id);

    List<Subject> findSubjectsByProfessionId(String professionId);

    List<Channel> findChannelsBySubjectId(String subjectId);

    List<Channel> findActiveChannelsBySubjectId(String subjectId);

    List<Channel> findInactiveChannelsBySubjectId(String subjectId);

    SubjectDiscussion findDiscussionBySubjectId(String subjectId);

    SubjectDiscussion findDiscussionById(String subjectDiscussionId);
}
