CREATE TABLE tag (
    tag_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,

    CONSTRAINT pk_tag PRIMARY KEY (tag_id),

    CONSTRAINT uc_tag_tag_id UNIQUE (tag_id),
    CONSTRAINT uc_tag_name UNIQUE (name)
);

CREATE TABLE subject_tag (
    subject_tag_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    subject_subject_id VARCHAR(255) NOT NULL,
    tag_tag_id VARCHAR(255) NOT NULL,

    CONSTRAINT pk_subject_tag PRIMARY KEY (subject_tag_id),

    CONSTRAINT fk_subject_tag_subject
        FOREIGN KEY (subject_subject_id)
            REFERENCES subject(subject_id)
            ON DELETE CASCADE,

    CONSTRAINT fk_subject_tag_tag
        FOREIGN KEY (tag_tag_id)
            REFERENCES tag(tag_id)
            ON DELETE CASCADE,

    CONSTRAINT uc_subject_tag_subject_tag_ids UNIQUE (subject_subject_id, tag_tag_id)
);

CREATE TABLE subject_discussion (
    subject_discussion_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    subject_tag_id VARCHAR(255) NOT NULL,

    CONSTRAINT pk_subject_discussion PRIMARY KEY (subject_discussion_id),

    CONSTRAINT fk_subject_discussion_subject_tag
        FOREIGN KEY (subject_tag_id)
            REFERENCES subject_tag(subject_tag_id)
            ON DELETE CASCADE,

    CONSTRAINT uc_subject_discussion_subject_tag_id UNIQUE (subject_tag_id)
);

CREATE TABLE profession_discussion (
    profession_discussion_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    profession_id VARCHAR(255) NOT NULL,

    CONSTRAINT pk_profession_discussion PRIMARY KEY (profession_discussion_id),

    CONSTRAINT fk_profession_discussion_profession
       FOREIGN KEY (profession_id)
           REFERENCES profession(profession_id)
           ON DELETE CASCADE,

    CONSTRAINT uc_profession_discussion_profession_id UNIQUE (profession_id)
);

CREATE TABLE comment (
     comment_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
     type VARCHAR(50) NOT NULL,
     subject_discussion_id VARCHAR(255),
     profession_discussion_id VARCHAR(255),
     content TEXT NOT NULL,

     CONSTRAINT pk_comment PRIMARY KEY (comment_id),

    CONSTRAINT uc_comment_comment_id UNIQUE (comment_id),

     CONSTRAINT fk_comment_subject_discussion
         FOREIGN KEY (subject_discussion_id)
             REFERENCES subject_discussion(subject_discussion_id)
             ON DELETE CASCADE,

     CONSTRAINT fk_comment_profession_discussion
         FOREIGN KEY (profession_discussion_id)
             REFERENCES profession_discussion(profession_discussion_id)
             ON DELETE CASCADE,

     CONSTRAINT check_comment_discussion_scope CHECK (
             (subject_discussion_id IS NOT NULL AND profession_discussion_id IS NULL)
             OR (subject_discussion_id IS NULL AND profession_discussion_id IS NOT NULL)
         )
);




