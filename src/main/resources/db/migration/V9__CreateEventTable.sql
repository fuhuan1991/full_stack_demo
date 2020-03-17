CREATE TABLE IF NOT EXISTS event (
    event_id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES "user" (user_id),
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(3000),
    time TIMESTAMP NOT NULL
);
