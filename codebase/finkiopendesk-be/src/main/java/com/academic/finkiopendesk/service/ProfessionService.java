package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Profession;

import java.util.List;

public interface ProfessionService {
    List<Profession> findAll();

    Profession findById(String id);
}
