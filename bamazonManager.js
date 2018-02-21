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
    
})

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, response){
        if (err) throw err;
        for(var i=0;i<response.length;i++){
            console.log("==========================================================================================");
            console.log("Item ID: " + response[i].item_id + " | " + 
                        "Product Name: " + response[i].product_name + " | " +
                        "Department: "  + response[i].department_name + " | " +
                        "Price: $" + parseFloat(response[i].price).toFixed(2) +" | " +
                        "Available Stock: " + response[i].stock_quantity);
        }
        
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
        
}

function addProduct(){

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