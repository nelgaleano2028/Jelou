CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);
INSERT INTO employee VALUES
(1, 'Joe', 1000),
(2, 'Henry', 2000),
(3, 'Sam', 2500),
(4, 'Max', 1500);

CREATE TABLE customers(
    customer_id INT(10) NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(40) UNIQUE,
    phone INT(10),
    created VARCHAR(30),
    PRIMARY KEY (customer_id)
);
INSERT INTO customers VALUES
(1, 'Jon Doe', 'jdoe.gmail.com', 315612312, CURDATE()),
(2, 'Rick Grimes', 'rgrimes.gmail.com', 316452154, CURDATE()),
(3, 'Jill Valantine', 'jvalentine.gmail.com', 316789451, CURDATE()),
(4, 'Green Day', 'gday.gmail.com', 314253635, CURDATE());


CREATE TABLE products(
    id_product INT(10) NOT NULL,
    name VARCHAR(45) NOT NULL,
    price_cents INT(12), 
    stock INT(6), 
    created VARCHAR(30),
    PRIMARY KEY (id_product)
);
INSERT INTO products VALUES
(1, 'Computador', 230, 140, CURDATE()),
(2, 'Celular', 106, 50, CURDATE()),
(3, 'Nevera', 190, 75, CURDATE()),
(4, 'Lavadora', 185, 105, CURDATE());


CREATE TABLE orders(
    id_orders INT(10) NOT NULL AUTO_INCREMENT, 
    customer_id INT(10), 
    status_order ENUM('CREATED', 'CONFIRMED', 'CANCELED') NOT NULL,   
    total_cents INT(15),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    PRIMARY KEY (id_orders)
)


CREATE TABLE order_items(
    id_order_items INT(10) NOT NULL AUTO_INCREMENT, 
    id_orders INT(10), 
    id_product INT(10), 
    cantidad INT(10), 
    unit_price_cents INT(12), 
    subtotal_cents INT(12),
    FOREIGN KEY (id_orders) REFERENCES orders(id_orders),
    FOREIGN KEY (id_product) REFERENCES products(id_product),
    PRIMARY KEY (id_order_items)
);