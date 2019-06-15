DROP TABLE IF EXISTS poets CASCADE;
DROP TABLE IF EXISTS poems CASCADE;

CREATE TABLE poets (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
	CONSTRAINT email_not_empty CHECK (email <> ''),
	CONSTRAINT password_not_empty CHECK (password <> '')
);

CREATE TABLE poems (
    poemId SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    poet INT,
    FOREIGN KEY (poet) REFERENCES poets(id)
);

INSERT INTO poets (email, password) VALUES ('poet1@poet1', 'poet1');
INSERT INTO poets (email, password) VALUES ('poet2@poet2', 'poet2');
INSERT INTO poets (email, password) VALUES ('poet2@poet3', 'poet3');

INSERT INTO poems (title) VALUES ('elso');
INSERT INTO poems (title) VALUES ('masodik');
INSERT INTO poems (title) VALUES ('harmadik');
INSERT INTO poems (title) VALUES ('negyedik');
INSERT INTO poems (title) VALUES ('otodik');


