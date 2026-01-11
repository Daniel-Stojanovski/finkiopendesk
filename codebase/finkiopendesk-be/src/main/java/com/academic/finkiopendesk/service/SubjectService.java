package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Subject;

import java.util.List;

public interface SubjectService {
    List<Subject> findAll();

    Subject findById(String id);

    List<Subject> findSubjectsByProfessionId(String professionId);
}
