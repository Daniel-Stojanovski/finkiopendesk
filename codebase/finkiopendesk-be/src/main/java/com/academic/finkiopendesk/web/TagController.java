package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.dto.TagDto;
import com.academic.finkiopendesk.service.TagService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public List<TagDto> getTags() {
        return tagService.findAll().stream()
                .map(TagDto::fromEntity)
                .toList();
    }
}
