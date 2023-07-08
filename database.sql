
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Create the ‘user’ table

-----------------------------------------------
-- create tables 

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
-- Table structure for aws piece 
CREATE TABLE "images" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(1000) NOT NULL,
	"type" VARCHAR(50) NOT NULL,
  author VARCHAR(50) NOT NULL,
	title VARCHAR(50),
	category VARCHAR(50)
);

-- Create the "audio" table
CREATE TABLE audio (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  author VARCHAR(50) NOT NULL,
	title VARCHAR(50),
	category VARCHAR(50)
);

-- Create the "videos" table
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  author VARCHAR(50) NOT NULL,
	title VARCHAR(50),
	category VARCHAR(50)
);

--login table to track user logins will be used to count hot streaks. 
CREATE TABLE login_history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  login_datetime TIMESTAMPTZ NOT NULL
);
-------------------------------------------------------------
-- Create views 
-- will replace the content table. 
CREATE VIEW videos_audio_view AS
SELECT ROW_NUMBER() OVER (order by 1) AS id, subquery.content_id, subquery.name, subquery.type
FROM (
    SELECT videos.id AS content_id, name, type
    FROM videos
    UNION
    SELECT audio.id AS content_id, name, type
    FROM audio
) AS subquery;
select * from videos_audio_view

-- Create a view to display the results
CREATE VIEW login_history_view AS
SELECT *,
       0 AS streak
FROM login_history;

--view to calculate hot streaks
create VIEW login_history_view AS
WITH login_history_cte AS (
  SELECT DISTINCT
    user_id,
    LEFT(login_datetime::text, 10) AS login_date,
    COALESCE(
      EXTRACT(DAY FROM lag(login_datetime) OVER (PARTITION BY user_id ORDER BY login_datetime DESC)) - EXTRACT(DAY FROM login_datetime),
      0
    ) AS day_difference,
    CASE WHEN COALESCE(EXTRACT(DAY FROM lag(login_datetime) OVER (PARTITION BY user_id ORDER BY login_datetime DESC)) - EXTRACT(DAY FROM login_datetime), 0) = 0 THEN 1 ELSE COALESCE(EXTRACT(DAY FROM lag(login_datetime) OVER (PARTITION BY user_id ORDER BY login_datetime DESC)) - EXTRACT(DAY FROM login_datetime), 0) END AS adjusted_day_difference
  FROM login_history
)
SELECT distinct lh.user_id,
       lh.login_date,
       lh.day_difference,
       lh.adjusted_day_difference,
       (
  SELECT COUNT(DISTINCT login_date)
  FROM login_history_cte
  WHERE user_id = lh.user_id
    AND login_date <= lh.login_date
    AND adjusted_day_difference = 1
) AS streak

FROM login_history_cte lh
ORDER BY lh.login_date DESC;

----------------------------------------------------------
-- Dummy data for testing purposes
INSERT INTO journal (user_id, journal, entry_date, mood)
VALUES
 (1, 'Today was a great day!', '2023-06-26', 5),
 (1, 'Feeling a bit tired today.', '2023-06-27', 3),
 (1, 'Had a productive day at work!', '2023-06-28', 4);

-- Three examples of badges
INSERT INTO badges (badge_name, summary)
VALUES ('First Meditation', 'View your first piece on content'),
    ('On Fire', 'Log in 3 days in a row.'),
    ('Reflection Time', 'Write your first journal entry'),
    ('Meditation Scholar', 'View 100 meditations'),
    ('Namaste', 'Write 100 journals entries');
-- Dummy earned badges for testing purposes
INSERT INTO badge_earned (badge_id, user_id)
VALUES (1, 1), (2, 1);


select * from login_history;
INSERT INTO login_history (user_id, login_datetime)
VALUES (1, '2023-07-01 00:00:00'),
       (1, '2023-07-04 00:00:00'),
       (1, '2023-07-05 00:00:00'),
       (1, '2023-07-06 00:00:00');

-------------------------------------------------------------
-- select queries for testing purposes
 select * from "user" ;
 select * from journal ;
 select * from "content" ;
 select * from content_seen ;
 select * from badges ;
 select * from badge_earned ;

--Hot streak query from view 
select * from login_history_view where user_id = 1 limit 1

select * from content_view;





