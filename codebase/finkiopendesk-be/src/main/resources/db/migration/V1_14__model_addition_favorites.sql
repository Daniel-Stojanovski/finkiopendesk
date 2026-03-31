CREATE TABLE user_favorites (
    user_favorite_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    user_id UUID NOT NULL,
    target_id VARCHAR(255) NOT NULL,
    target_type VARCHAR(255) NOT NULL,

    CONSTRAINT pk_user_favorite PRIMARY KEY (user_favorite_id),

    CONSTRAINT uc_user_favorite_id UNIQUE (user_favorite_id),

    CONSTRAINT uc_user_favorite_user_and_target UNIQUE (user_id, target_id, target_type),

    CONSTRAINT fk_user_favorite_user_id
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);