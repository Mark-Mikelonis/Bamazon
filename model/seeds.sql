INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Headphone Amp", "Electronics", 45.00, 27, 0);
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Ginsu Knife", "Kitchen", 19.95, 17,0);
INSERT INTO products( product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Hi-Fi Portable Music Player", "Electronics", 745.00, 13,0);        
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Headphones", "Electronics", 145.00, 33,0);
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Insta Pot", "Kitchen", 125.00, 7,0);
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Cuisinart", "Kitchen", 155.00, 29,0);
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("B-Complex Vitamin", "Health", 15.95, 27,0);
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Collagen Peptides", "Health", 22.00, 27,0);
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Host Defense", "Health", 35.00, 27,0);
INSERT INTO products(product_name, department_name, price,stock_quantity,product_sales)
    VALUES("Turntable", "Electronics", 245.00, 23,0);






INSERT INTO departments(department_name,over_head_costs) 
        VALUES("Health", 1200);    
INSERT INTO departments(department_name,over_head_costs) 
        VALUES("Kitchen", 1800);  
INSERT INTO departments(department_name,over_head_costs) 
        VALUES("Electronics", 1500);  
        


SELECT DISTINCT(d.department_id), d.department_name, sum(d.over_head_costs) AS Overhead, sum(p.product_sales) AS Sales, sum((p.product_sales - d.over_head_costs)) AS total_profit 
    FROM products AS p INNER JOIN departments AS d ON d.department_name=p.department_name GROUP BY department_name;      



SELECT o.custid, c.name, MAX(o.payment)
  FROM orders AS o, customers AS c
  WHERE o.custid = c.custid
  GROUP BY o.custid;     