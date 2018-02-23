var inquirer = require("inquirer");
var mysql = require("mysql");
var config = require("./config.js");
var Table = require("cli-table");
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

var table = new Table({
    head:["Department ID","Deparmtent Name","Overhead Costs","Product Sales","Total Profit"],
    colWidths:[20,20,20,15,15] 
})

function displayProductSales(){
    var query = "SELECT department_id, departments.department_name, over_head_costs, product_sales," + 
                    "(product_sales - over_head_costs) total_profit " +
                    "FROM departments " +
                    "INNER JOIN products ON departments.department_name=products.department_name;";
    connection.query(query, function(err,response){
        if(err) throw err;
        for(var i=0;i<response.length;i++){
            table.push([response[i].department_id,response[i].department_name,parseFloat(response[i].over_head_costs).toFixed(2),
            parseFloat(response[i].product_sales).toFixed(2),parseFloat(response[i].total_profit).toFixed(2)]);
            
        }
        console.log(table.toString());
        promptUser();
    });                
}

function addDepartment(){

    inquirer.prompt(
        [{
            name: "department_name",
            type: "input",
            message: "Please enter Department Name"
        },
        {
            name: "overhead",
            type: "input",
            message: "Please enter Overhead Costs"
        }]
    ).then(function(data){
        var query = "INSERT INTO departments(department_name, over_head_costs)" +
                    "VALUES(?,?)";
        connection.query(query,[data.department_name, data.overhead], function(err, response){
            if(err) throw err;
            if (response){
                console.log(data.department_name + " added!");

            }
        });
        setTimeout(function(){
        promptUser();            
            
        },500);
    });
    
}



function promptUser(){
    inquirer.prompt(
        [{
        name: "options",
        type: "list",
        message: "Please select an option",
        choices:["View Products Sales by Department", 
                    "Create New Department"]
        }]).then( function(data){
            console.log(data.options);
            switch(data.options){
                case "View Products Sales by Department":
                    displayProductSales();
                    break;
                case "Create New Department":
                    addDepartment();
                    break;
                
                  
            }
    
    });
}    