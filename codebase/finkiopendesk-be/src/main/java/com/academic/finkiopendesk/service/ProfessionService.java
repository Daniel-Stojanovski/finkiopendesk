package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.ProfessionDiscussion;

import java.util.List;

public interface ProfessionService {
    List<Profession> findAll();

    Profession findById(String id);

    ProfessionDiscussion findDiscussionByProfessionId(String professionId);
}
