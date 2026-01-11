package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.repository.ProfessionRepository;
import com.academic.finkiopendesk.service.ProfessionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionServiceImpl implements ProfessionService {

    private final ProfessionRepository professionRepository;

    public ProfessionServiceImpl(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    @Override
    public List<Profession> findAll() {
        return professionRepository.findAll();
    }

    @Override
    public Profession findById(String id) {
        return professionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profession not found"));
    }
}
