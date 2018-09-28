DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE product(
  id INT NOT NULL AUTO_INCREMENT,
  article VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  quantityInStock INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO product (article, department, quantityInStock) values ('dress oxford', 'footwear', 11);
INSERT INTO product (article, department, quantityInStock) values ('running shoe', 'footwear', 12);
INSERT INTO product (article, department, quantityInStock) values ('hiking boot', 'footwear', 13);
INSERT INTO product (article, department, quantityInStock) values ('short sleeve', 'shirts', 14);
INSERT INTO product (article, department, quantityInStock) values ('long sleeve', 'shirts', 15);
INSERT INTO product (article, department, quantityInStock) values ('red flanel', 'shirts', 16);
INSERT INTO product (article, department, quantityInStock) values ('blue jeans', 'pants', 17);
INSERT INTO product (article, department, quantityInStock) values ('dress slacks', 'pants', 18);
INSERT INTO product (article, department, quantityInStock) values ('hooded parka', 'outerwear', 19);
INSERT INTO product (article, department, quantityInStock) values ('leather mitts', 'outerwear', 20);

