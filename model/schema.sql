DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INTEGER(6) NOT NULL,
    product_sales INTEGER(10) DEFAULT 0,
    PRIMARY KEY(item_id)
 );       


 CREATE TABLE departments(
    department_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER(6) NOT NULL,
    PRIMARY KEY(department_id) 
 );



