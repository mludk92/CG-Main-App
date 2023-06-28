
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Create the ‘user’ table
CREATE TABLE "user" (
 id SERIAL PRIMARY KEY,
 first_name VARCHAR(50),
 last_name VARCHAR(50),
 birthdate DATE,
 email VARCHAR(100),
 password varchar(250),
 username varchar(50),
 pronoun varchar(50)
);

 -- Create the ‘journal’ table
CREATE TABLE journal (
 id SERIAL PRIMARY KEY,
 user_id INT REFERENCES "user"(id),
 journal VARCHAR(5000) not null,
 entry_date DATE not null,
 mood int null
);

-- Create the ‘content’ table
CREATE TABLE content (
 id SERIAL PRIMARY KEY,
 file_name VARCHAR(250) UNIQUE,
 s3_key VARCHAR(250) UNIQUE,
 created_by INT REFERENCES "user"(id)
);

-- Create the ‘content_seen’ table
CREATE TABLE content_seen (
 id SERIAL PRIMARY KEY,
 content_id INT REFERENCES content(id),
 consumer_id INT REFERENCES "user"(id),
 favorite INT DEFAULT 0
);

-- Create the ‘fin_goal’ table
--CREATE TABLE fin_goal (
-- id SERIAL PRIMARY KEY,
-- income_yr DOUBLE PRECISION,
-- monthly_goal DOUBLE PRECISION,
-- monthly_spending DOUBLE PRECISION,
-- user_id INT REFERENCES “user”(id)
--);

-- Create the ‘badges’ table
CREATE TABLE badges (
 id SERIAL PRIMARY KEY,
 badge_name VARCHAR(50) UNIQUE,
 summary VARCHAR(1000)
);

-- Create the ‘badge_earned’ table
CREATE TABLE badge_earned (
 id SERIAL PRIMARY KEY,
 badge_id INT REFERENCES badges(id),
 user_id INT REFERENCES "user"(id)
);

 select * from "user" ;
 select * from journal ;
 select * from "content" ;
 select * from content_seen ;
 select * from badges ;
 select * from badge_earned ;




-- Dummy journal entries for testing purposes
INSERT INTO journal (user_id, journal, entry_date, mood)
VALUES
 (1, 'Today was a great day!', '2023-06-26', 5),
 (1, 'Feeling a bit tired today.', '2023-06-27', 3),
 (1, 'Had a productive day at work!', '2023-06-28', 4);

-- Three examples of badges
INSERT INTO badges (badge_name, summary)
VALUES ('First Meditation', 'View your first piece on content'),
    ('On Fire', 'Log in 3 days in a row.'),
    ('Reflection Time', 'Write your first journal entry');

-- Dummy earned badges for testing purposes
INSERT INTO badge_earned (badge_id, user_id)
VALUES (1, 1), (2, 1);