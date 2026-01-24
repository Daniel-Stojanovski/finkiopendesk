package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Tag;

import java.util.List;

public interface TagService {
    List<Tag> findAll();

    Tag findById(String id);
}
