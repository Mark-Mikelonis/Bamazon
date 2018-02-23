var inquirer = require("inquirer");
var mysql = require("mysql");
var config = require("./config.js");
var key = config.key;
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user: "root",
    password: key,
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    promptUser();
    
});

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, response){
        if (err) throw err;
        for(var i=0;i<response.length;i++){
            console.log("==========================================================================================");
            console.log("Item ID: " + response[i].item_id + " | " + 
                        "Product Name: " + response[i].product_name + " | " +
                        "Price: $" + parseFloat(response[i].price).toFixed(2) +" | " +
                        "Available Stock: " + response[i].stock_quantity);
        }
        console.log("==========================================================================================");
    });

}

function viewLowInv(){
    var query = "SELECT item_id, product_name, stock_quantity FROM products" + 
                " WHERE stock_quantity < 5";
    connection.query(query, function(err, response){
        if(err) throw err;
        for(var i=0;i<response.length;i++){
            console.log("Item ID: " + response[i].item_id + " | " + 
                    "Product Name: " + response[i].product_name + " | " +
                    "Available Stock: " + response[i].stock_quantity);
        }
        
    });

}
function updateInventory(){
        inquirer.prompt(
            [{
                name: "item_id",
                type: "input",
                message: "Please enter an Item ID",

            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter quantity received"
            }]
        ).then(function(data){
            var query = "UPDATE products SET stock_quantity=stock_quantity + ? WHERE ?";
            connection.query(query, [data.quantity,{item_id:data.item_id}], function(err, response){
                if(err) throw err;
                if(response){
                    console.log("Quantity updated!");
                }
            });
        });
}


function addProduct(){
    inquirer.prompt(
        [{
            name: "product_name",
            type: "input",
            message: "Please enter a Product Name",

        },
        {
            name: "department_name",
            type: "input",
            message: "Please enter Department Name"
        },
        {
            name: "price",
            type: "input",
            message: "Please enter Price"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Please enter Quantity Received"
        }]
    ).then(function(data){
        var query = "INSERT INTO products(product_name, department_name, price, stock_quantity)" +
                    "VALUES(?,?,?,?)";
        connection.query(query,[data.product_name, data.department_name, data.price, data.stock_quantity], function(err, response){
            if (response){
                console.log(data.product_name + " added!");

            }
        })            
    });
}

function promptUser(){
    inquirer.prompt(
        [{
        name: "options",
        type: "list",
        message: "Please select an option",
        choices:["View Products for Sale", 
                    "View Low Inventory", 
                    "Add to Inventory", 
                    "Add New Product"]
        }]).then( function(data){
            console.log(data.options);
            switch(data.options){
                case "View Products for Sale":
                    displayProducts();
                    break;
                case "View Low Inventory":
                    viewLowInv();
                    break;
                case "Add to Inventory":
                    updateInventory();
                    break;
                case "Add New Product": 
                    addProduct();
                    break;
            }
    
    });
}