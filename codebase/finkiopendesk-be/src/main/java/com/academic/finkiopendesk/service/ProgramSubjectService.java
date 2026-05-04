package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.dto.ProgramSubjectDto;

import java.util.List;
public interface ProgramSubjectService {
    List<ProgramSubjectDto> getSubjectsForProfession(String professionId);

    List<ProgramSubjectDto> getSubjectsForProfessionFiltered(
            String professionId,
            String query,
            String program,
            String format,
            String hardness,
            String semesterType
    );
}
