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

INSERT INTO subject_dependency (program_subject_id, dependant_id) VALUES
    ('cad45bca-c091-49d3-98a7-6b2397673dfd','1bfca51a-079b-4640-b7d3-51c8a2e1e380');