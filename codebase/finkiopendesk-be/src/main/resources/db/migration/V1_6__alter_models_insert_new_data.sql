ALTER TABLE subject_discussion
DROP CONSTRAINT IF EXISTS fk_subject_discussion_subject_tag;

ALTER TABLE subject_discussion
DROP CONSTRAINT IF EXISTS uc_subject_discussion_subject_tag_id;

ALTER TABLE subject_discussion
DROP COLUMN IF EXISTS subject_tag_id;


ALTER TABLE subject_discussion
    ADD COLUMN subject_id VARCHAR(255) NOT NULL;

ALTER TABLE subject_discussion
    ADD CONSTRAINT fk_subject_discussion_subject
        FOREIGN KEY (subject_id)
            REFERENCES subject(subject_id)
            ON DELETE CASCADE;

ALTER TABLE subject_discussion
    ADD CONSTRAINT uc_subject_discussion_subject
        UNIQUE (subject_id);


INSERT INTO subject_discussion (subject_discussion_id, name, description,subject_id)
SELECT
    gen_random_uuid()::text,
    s.name,
    'Discussion for ' || s.name,
    s.subject_id
FROM subject s
    ON CONFLICT (subject_id) DO NOTHING;