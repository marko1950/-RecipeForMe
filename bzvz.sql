CREATE TABLE recipes (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255)  NOT NULL,
    image VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    ingredients TEXT[] NOT NULL
);


CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    quantity NUMERIC NOT NULL,
    unit VARCHAR(20) NOT NULL
);

INSERT INTO ingredients (name, quantity, unit) VALUES 
    ('Flour', 2, 'kg'),
    ('Sugar', 1, 'kg'),
    ('Milk', 3, 'liters');