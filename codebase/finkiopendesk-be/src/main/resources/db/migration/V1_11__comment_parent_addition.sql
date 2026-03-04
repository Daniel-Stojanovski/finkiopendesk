ALTER TABLE comment
    ADD COLUMN comment_parent_id VARCHAR(255);

ALTER TABLE comment
    ADD CONSTRAINT fk_comment_parent_id
        FOREIGN KEY (comment_parent_id)
            REFERENCES comment(comment_id)
                ON DELETE CASCADE;