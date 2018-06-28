DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT (10) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Drone", "Fun Stuff", 500.25, 50);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Shake Weight", "Fitness", 25.95, 25);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Alienware Laptop", "Fun Stuff", 2500.95, 15);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Cookies", "Food", 5.65, 500);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Basketball", "Fitness", 30.76, 100);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Bench Press", "Fitness", 1000.95, 24);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Xbox One", "Fun Stuff", 499.99, 67);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Chocolate Shake", "Food", 5.65, 78);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Boxing Gloves", "Fitness", 45.76, 300);

INSERT INTO products (product_name, department_name ,price, stock_quantity)
VALUES ("Dog Treats", "Pets", 12.34, 6000);