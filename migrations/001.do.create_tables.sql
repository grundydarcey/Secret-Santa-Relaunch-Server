CREATE TABLE IF NOT EXISTS members (
    id INT GENERATED ALWAYS AS IDENTITY UNIQUE,
    member_name TEXT NOT NULL,
    member_partner TEXT,
    price INTEGER NOT NULL,
    member_picture TEXT NOT NULL,
    group_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS  personalLists (
    id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    link TEXT NOT NULL,
    FOREIGN KEY (users_id)
      REFERENCES members(id)
      ON DELETE CASCADE
);