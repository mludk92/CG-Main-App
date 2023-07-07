CREATE OR REPLACE PROCEDURE setup_database()
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create the 'user' table
  CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birthdate DATE,
    email VARCHAR(100),
    password VARCHAR(250),
    username VARCHAR(50),
    pronoun VARCHAR(50)
  );

  -- Create the 'journal' table
  CREATE TABLE IF NOT EXISTS journal (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id),
    journal VARCHAR(5000) NOT NULL,
    entry_date DATE NOT NULL,
    mood INT NULL
  );

  -- Create the 'content' table
  CREATE TABLE IF NOT EXISTS content (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(250) UNIQUE,
    s3_key VARCHAR(250) UNIQUE,
    created_by INT REFERENCES "user"(id)
  );

  -- Create the 'content_seen' table
  CREATE TABLE IF NOT EXISTS content_seen (
    id SERIAL PRIMARY KEY,
    content_id INT REFERENCES content(id),
    consumer_id INT REFERENCES "user"(id),
    favorite INT DEFAULT 0
  );

  -- Create the 'badges' table
  CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    badge_name VARCHAR(50) UNIQUE,
    summary VARCHAR(1000)
  );

  -- Create the 'badge_earned' table
  CREATE TABLE IF NOT EXISTS badge_earned (
    id SERIAL PRIMARY KEY,
    badge_id INT REFERENCES badges(id),
    user_id INT REFERENCES "user"(id)
  );

  -- Create the 'login_history' table
  CREATE TABLE IF NOT EXISTS login_history (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    login_datetime TIMESTAMPTZ NOT NULL
  );

  -- Create the 'images' table
  CREATE TABLE IF NOT EXISTS "images" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(1000) NOT NULL,
    type VARCHAR(50) NOT NULL
  );

  -- Create the 'audio' table
  CREATE TABLE IF NOT EXISTS audio (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50)
  );

  -- Create the 'videos' table
  CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50)
  );

  -- Create the 'videos_audio_view' view
  CREATE OR REPLACE VIEW videos_audio_view AS
  SELECT ROW_NUMBER() OVER (ORDER BY 1) AS id, subquery.content_id, subquery.name, subquery.type
  FROM (
    SELECT videos.id AS content_id, name, type
    FROM videos
    UNION
    SELECT audio.id AS content_id, name, type
    FROM audio
  ) AS subquery;

  -- Create the 'login_history_view' view
  CREATE OR REPLACE VIEW login_history_view AS
  SELECT *, 0 AS streak
  FROM login_history;

  -- Dummy data for testing purposes
  INSERT INTO journal (user_id, journal, entry_date, mood)
  VALUES (1, 'Today was a great day!', '2023-06-26', 5),
         (1, 'Feeling a bit tired today.', '2023-06-27', 3),
         (1, 'It was a terrible day.', '2023-06-27', 1),
         (1, 'I have better days ', '2023-06-27', 2),
         (1, 'Had a productive day at work!', '2023-06-28', 4);

  -- Three examples of badges
  INSERT INTO badges (badge_name, summary)
  VALUES ('First Meditation', 'View your first piece of content'),
         ('On Fire', 'Log in 3 days in a row.'),
         ('Reflection Time', 'Write your first journal entry'),
         ('Meditation Scholar', 'View 100 meditations'),
         ('Namaste', 'Write 100 journal entries');

  -- Dummy earned badges for testing purposes
  INSERT INTO badge_earned (badge_id, user_id)
  VALUES (1, 1), (2, 1);

  -- Insert login history
  INSERT INTO login_history (user_id, login_datetime)
  VALUES (1, '2023-07-01 00:00:00'),
         (1, '2023-07-04 00:00:00'),
         (1, '2023-07-05 00:00:00'),
         (1, '2023-07-06 00:00:00');
END;
$$;

-- Call the stored procedure to set up the database
CALL setup_database();
