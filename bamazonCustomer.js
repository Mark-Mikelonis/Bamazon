
var inquirer = require("inquirer");
var mysql = require("mysql");
var config = require("./config.js");
var Table = require("cli-table");
var key = config.key;
var custCost = 0;
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
});

var table = new Table({
    head:['Item ID','Product Name','Department','Price','Available Stock'],
    colWidths: [10,40,20,15,20]
});

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, response){
        if (err) throw err;
        for(var i=0;i<response.length;i++){
            table.push([response[i].item_id,response[i].product_name,response[i].department_name, 
            parseFloat(response[i].price).toFixed(2),response[i].stock_quantity]);
            
        }
        console.log(table.toString());
        promptUser();
    });

}

function buyItem(id, quantity){
   
    var query = "SELECT stock_quantity, price FROM products WHERE ?";
    connection.query(query,{item_id:id}, function(err, response){
        if(err) throw err;
        if(response[0].stock_quantity < quantity){
            console.log("Not enough in stock!");
            promptUser();
        } else {
            custCost = parseFloat(response[0].price * quantity).toFixed(2);
            updateSales(id, custCost);
            updateStock(id, quantity);
        }
    });
}
 function updateSales(id, sales){
    var query = "UPDATE products SET product_sales=product_sales + ? WHERE ?";
    connection.query(query,[sales,{item_id:id}], function(err, response){
        if(err) throw err;
        
    });
 }
function updateStock(id, quantity){
    var query = "UPDATE products SET stock_quantity=stock_quantity - ? WHERE ?";
    connection.query(query, [quantity,{item_id:id}], function(err, response){
        if (err) throw err;
        console.log("Items purchased!");
        console.log("Your total cost: $" + custCost);
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
            if(isNumber(id) && isNumber(quantity)){
                buyItem(id, quantity);
            }
    
    });
}


function isNumber(entry){
    var regExp = /^[0-9]+$/;
    return regExp.test(entry);
}