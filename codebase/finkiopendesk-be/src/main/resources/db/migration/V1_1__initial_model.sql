CREATE TABLE profession (
    profession_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    alternative_name VARCHAR(255),
    description TEXT,

    CONSTRAINT pk_profession PRIMARY KEY (profession_id),

    CONSTRAINT uc_profession_profession_id UNIQUE (profession_id)
);

CREATE TABLE subject (
    subject_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    description TEXT,

    CONSTRAINT pk_subject PRIMARY KEY (subject_id),

    CONSTRAINT uc_subject_subject_id UNIQUE (subject_id)
);

CREATE TABLE profession_subject_recommendation (
    profession_profession_id VARCHAR(255) NOT NULL,
    subject_subject_id VARCHAR(255) NOT NULL,

    CONSTRAINT fk_profession_subject_recommendation_profession
       FOREIGN KEY (profession_profession_id)
           REFERENCES profession(profession_id)
           ON DELETE CASCADE,

    CONSTRAINT fk_profession_subject_recommendation_subject
       FOREIGN KEY (subject_subject_id)
           REFERENCES subject(subject_id)
           ON DELETE CASCADE,

    CONSTRAINT pk_profession_subject_recommendation
        PRIMARY KEY (profession_profession_id, subject_subject_id),

    CONSTRAINT uc_profession_subject_recommendation_profession_subject_ids
       UNIQUE (profession_profession_id, subject_subject_id)
);

