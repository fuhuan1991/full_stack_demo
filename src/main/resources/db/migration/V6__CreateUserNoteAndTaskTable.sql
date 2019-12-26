CREATE TABLE IF NOT EXISTS "user" (
    user_id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS note (
    note_id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES "user" (user_id),
    title VARCHAR(100),
    description VARCHAR(1000) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS task (
    task_id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES "user" (user_id),
    title VARCHAR(100),
    description VARCHAR(1000) NOT NULL UNIQUE,
    deadline DATE
);

