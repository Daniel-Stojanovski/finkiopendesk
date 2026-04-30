package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Program;
import com.academic.finkiopendesk.model.dto.ProgramDto;

import java.util.List;

public interface ProgramService {
    Program findById(String id);

    List<ProgramDto> findAll();
}
