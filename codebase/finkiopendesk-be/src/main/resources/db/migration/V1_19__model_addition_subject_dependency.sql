CREATE TABLE subject_dependency (
    program_subject_id VARCHAR(255) NOT NULL,
    dependant_id VARCHAR(255) NOT NULL,

    CONSTRAINT fk_subject_dependency_program_subject
        FOREIGN KEY (program_subject_id)
            REFERENCES program_subject(program_subject_id)
            ON DELETE CASCADE,

    CONSTRAINT fk_subject_dependency_dependant
        FOREIGN KEY (dependant_id)
            REFERENCES program_subject(program_subject_id)
            ON DELETE CASCADE,

    CONSTRAINT pk_subject_dependency
        PRIMARY KEY (program_subject_id, dependant_id)
);