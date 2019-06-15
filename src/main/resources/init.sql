/*
    Database initialization script that runs on every web-application redeployment.
*/
DROP TABLE IF EXISTS poets;
DROP TABLE IF EXISTS poems;

CREATE TABLE poets (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
	CONSTRAINT email_not_empty CHECK (email <> ''),
	CONSTRAINT password_not_empty CHECK (password <> '')
);

CREATE TABLE poems (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    poet INT,
    FOREIGN KEY (poet) REFERENCES poets(id);
);

INSERT INTO poets (email, password) VALUES
	('poet1@poet1', 'poet1'), -- 1
	('poet2@poet2', 'poet2'), -- 2
	('poet2@poet3', 'poet3'); -- 3

INSERT INTO poems (title) VALUES
	('elso'),   -- 1
	('masodik'),  -- 2
	('harmadik'), -- 3
	('negyedik'),   -- 4
	('otodik');   -- 5


