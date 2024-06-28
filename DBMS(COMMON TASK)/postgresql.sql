psql -U postgres

 CREATE DATABASE inventoryDB;

\c inventorydb;


CREATE TABLE products (
    name VARCHAR(255),
    description VARCHAR(255),
    price NUMERIC(10, 2),
    quantity INT,
    category VARCHAR(255)
);


INSERT INTO products VALUES ('Pen', 'drawing', 2, 10, 'stationary'),('Eraser', 'erase', 30, 5, 'stationary'),('Dog', 'pet', 4000, 1, 'animal');

SELECT * FROM products;

SELECT * FROM products WHERE price<20;

SELECT * FROM products WHERE quantity>1;

UPDATE products SET price=100 WHERE name='Pen';

DELETE FROM products WHERE name='Pen';