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
    displayProducts();
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
        promptUser();
    });

}

function buyItem(id, quantity){
    console.log("in buyItem: ID: " + id + " Quantity: " + quantity);
    var query = "SELECT stock_quantity FROM products WHERE ?";
    connection.query(query,{item_id:id}, function(err, response){
        console.log("inStock: "+ response[0].stock_quantity);
        if(err) throw err;
        if(response[0].stock_quantity < quantity){
            console.log("Not enough in stock");
            promptUser();
        } else {
            updateStock(id, quantity);
        }
    });
}

function updateStock(id, quantity){
    var query = "UPDATE products SET stock_quantity=stock_quantity - ? WHERE ?";
    connection.query(query, [quantity,{item_id:id}], function(err, response){
        if (err) throw err;
        console.log("Items purchased");
        connection.end();
    });
}

function promptUser(){
    inquirer.prompt(
        [{
        name: "id",
        type: "input",
        message: "Please enter a product ID:"
        },
        { name:"quantity",
          type:"input",
          message:"How many would you like to buy?"  
    
        }]).then( function(data){
            var id = parseInt(data.id);
            var quantity = parseInt(data.quantity);
            console.log("in promptUser promise:");
            if(isNumber(id) && isNumber(quantity)){
                buyItem(id, quantity);
            }
    
    });
}


function isNumber(entry){
    var regExp = /^[0-9]+$/;
    return regExp.test(entry);
}