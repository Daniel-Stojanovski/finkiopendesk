ALTER TABLE comment
    ADD COLUMN comment_user_id UUID NOT NULL;

ALTER TABLE comment
    ADD CONSTRAINT fk_comment_user_id
        FOREIGN KEY (comment_user_id)
            REFERENCES users(user_id);