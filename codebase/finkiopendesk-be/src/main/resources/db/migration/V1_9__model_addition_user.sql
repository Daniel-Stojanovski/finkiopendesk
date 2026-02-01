CREATE TABLE users (
    user_id UUID NOT NULL ,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    student BOOLEAN NOT NULL DEFAULT FALSE,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT pk_user PRIMARY KEY (user_id),

    CONSTRAINT uc_user_user_id UNIQUE (user_id)
);