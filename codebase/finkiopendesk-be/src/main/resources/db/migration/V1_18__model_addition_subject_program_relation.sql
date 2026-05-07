CREATE TABLE program_subject (
     program_subject_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
     program_id VARCHAR NOT NULL,
     subject_id VARCHAR NOT NULL,
     type VARCHAR(255), -- MANDATORY / ELECTIVE / OTHER

     CONSTRAINT pk_subject_program PRIMARY KEY (program_subject_id),

     CONSTRAINT fk_program_subject_program_id
         FOREIGN KEY (program_id) REFERENCES program(program_id),

     CONSTRAINT fk_program_subject_subject_id
         FOREIGN KEY (subject_id) REFERENCES subject(subject_id),

     CONSTRAINT uc_program_subject UNIQUE(program_id, subject_id)
);
