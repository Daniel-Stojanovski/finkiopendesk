CREATE TABLE channel (
    channel_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    subject_tag_id VARCHAR(255) NOT NULL,

    CONSTRAINT pk_channel PRIMARY KEY (channel_id),

    CONSTRAINT uc_channel_channel_id UNIQUE (channel_id),

    CONSTRAINT fk_channel_subject_tag
        FOREIGN KEY (subject_tag_id)
            REFERENCES subject_tag(subject_tag_id)
            ON DELETE CASCADE,

    CONSTRAINT uc_channel_subject_tag_id
        UNIQUE (subject_tag_id)
);

INSERT INTO channel (channel_id, name, description, subject_tag_id)
SELECT
    gen_random_uuid()::text,
    s.name || ' | ' || t.name,
    'Channel for ' || s.name || ' - ' || t.name,
    st.subject_tag_id
FROM subject_tag st
    JOIN subject s ON s.subject_id = st.subject_subject_id
         JOIN tag t ON t.tag_id = st.tag_tag_id;