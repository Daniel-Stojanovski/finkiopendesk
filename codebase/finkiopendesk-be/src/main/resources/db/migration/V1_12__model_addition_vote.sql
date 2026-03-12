CREATE TABLE votes (
    vote_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    user_id UUID NOT NULL,
    subject_id VARCHAR(255) NOT NULL,
    profession_id VARCHAR(255) NOT NULL,
    vote INT NOT NULL,

    CONSTRAINT pk_vote PRIMARY KEY (vote_id),

    CONSTRAINT fk_vote_user
      FOREIGN KEY (user_id) REFERENCES users(user_id),

    CONSTRAINT fk_vote_subject
      FOREIGN KEY (subject_id) REFERENCES subject(subject_id),

    CONSTRAINT fk_vote_profession
      FOREIGN KEY (profession_id) REFERENCES profession(profession_id),

    CONSTRAINT uc_vote_user_vote
      UNIQUE (user_id, subject_id, profession_id)
);