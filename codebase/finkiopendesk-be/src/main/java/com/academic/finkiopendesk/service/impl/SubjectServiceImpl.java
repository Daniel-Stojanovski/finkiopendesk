package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.Subject;
import com.academic.finkiopendesk.repository.SubjectRepository;
import com.academic.finkiopendesk.service.ProfessionService;
import com.academic.finkiopendesk.service.SubjectService;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return profession.getRecommendedSubjects();
    }

}
