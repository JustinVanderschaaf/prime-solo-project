
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255)
);

CREATE TABLE "project" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "category_id" INT REFERENCES "category",
    "date" date,
    "budget" INTEGER,
    "title" VARCHAR (300),
    "user_notes" VARCHAR(20000)
);


CREATE TABLE "image" (
    "id" SERIAL PRIMARY KEY,
    "project_id" INT NOT NULL,
    "url" VARCHAR(500),
    "before_img" BOOLEAN,
    "subtitle" VARCHAR(300)
);

1
2
ALTER TABLE image ADD FOREIGN KEY (project_id)
REFERENCES project(id) ON DELETE CASCADE;


CREATE TABLE "materials" (
    "id" SERIAL PRIMARY KEY,
    "project_id" INT NOT NULL,
    "material" VARCHAR(300),
    "qty" INTEGER,
    "cost" DECIMAL,
    "on_hand" BOOLEAN ,
    "location" VARCHAR(300)
);
ALTER TABLE ONLY materials ALTER COLUMN on_hand SET DEFAULT false;

ALTER TABLE materials ADD FOREIGN KEY (project_id)
REFERENCES project(id) ON DELETE CASCADE;

ALTER TABLE project ADD COLUMN after_img varchar;
ALTER TABLE project ADD COLUMN before_img varchar;

ALTER TABLE project ALTER COLUMN before_img SET DEFAULT 'New-project.jpeg';

ALTER TABLE project ALTER COLUMN after_img SET DEFAULT 'New-project.jpeg';

