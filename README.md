# Bamazon

### Application Summary
Bamazon is command line based application that operates a dummy store. 
There are three basic roles of users in Bamazon. 

* The User role: Allows a customer to view available inventory and make a purchase.
* The Manager role: Allows a manager to view items for sale, view low inventory, add to inventory, and add new products.
* The Supervisor role: Allows a supervisor to view sales by department and add a department.



### Dependencies
Bamazon requires the following to operate:
* node.js - must be installed inependently
* mysql-server - must be installed independently
* inquirer - will be installed with npm i
* cli-table - will be installed with npm i

### Installation
1. ensure that you have node.js and mysql-server installed on your system
2. clone down the repository to a directory of your choosing
3. open the new Bamazon directory in the terminal 
4. type 'npm i' without the quotes on the command line to initialize the node modules
5. create the database in mysql using the schema.sql file in the model diectory
6. fill in some data with the seeds.sql file or enter your own data
  
### User Role

To start the user part of the application navigate to the Bamazon directory in the terminal and type 
> node bamazonCustomer.js
and hit enter

![Customer](https://github.com/Mark-Mikelonis/Bamazon/tree/master/images/customer.gif)

### Manager Role

To start the manager part of the application navigate to the Bamazon directory in the terminal and type 
> node bamazonManager.js
and hit enter


![Manager](https://github.com/Mark-Mikelonis/Bamazon/tree/master/images/manager.gif)

### Supervisor Role

To start the supervisor part of the application navigate to the Bamazon directory in the terminal and type 
> node bamazonsupervisor.js
and hit enter


![Supervisor](https://github.com/Mark-Mikelonis/Bamazon/tree/master/images/supervisor.gif)
