CREATE TABLE IF NOT EXISTS members (
    id INT GENERATED ALWAYS AS IDENTITY,
    member_name TEXT NOT NULL,
    member_partner TEXT,
    price INTEGER NOT NULL,
    member_picture TEXT NOT NULL
);