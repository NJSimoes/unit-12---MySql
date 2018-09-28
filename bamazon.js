// # Node.js & MySQL

// ## Overview

// In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this week. 

// Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage. 

var mysql = require("mysql");
var inquirer = require("inquirer");
console.clear()

// create connection to db

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
});

// The app will take in orders from customers and deplete stock from the store's inventory. 

start()

// print out available inventory

function start() {
  console.clear()
  console.log("Welcome to Bamazon\n")
  console.log("These are our products and the quantities we have in stock: \n\n");
  console.log("Item #\tQty in Stock\tProduct\t\tDepartment")
  connection.query("SELECT * FROM product", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("   " + res[i].id + "\t      " + res[i].quantityInStock + " \t" + res[i].article + "\t" + res[i].department);
    }
    buyProduct()
  })
}

// get the item and qty for the order

function buyProduct() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "\n\nWhat is the number of the item you would like to buy?",
      },
      {
        name: "quantity",
        type: "input",
        message: "\nHow many?"
      }
    ])

// now  get the old qty in stock so you can subtract the amount they want to buy
    
    .then(function (answer) {
      var newQuantity = 0
      connection.query(
        "SELECT quantityInStock FROM product WHERE id = ?", [answer.item], function (err, res) {
          if (err) throw err;
          var oldQuantity = res[0].quantityInStock;
          var newQuantity = oldQuantity - answer.quantity;
         
// now update db
         
          connection.query("UPDATE product SET ? WHERE ?",
            [
              {
                quantityInStock: res[0].quantityInStock - answer.quantity
              },
              {
                id: answer.item
              }
            ],
            function (error) {
              if (error) throw err;
              
// let the user know, and ask if they want to start over
              
              console.log("\n\nOrder placed successfully!");
              inquirer
                .prompt([
                  {
                    name: "again",
                    type: "input",
                    message: "\n\nDo you want to place another order? (y/n)",
                  }
                ])
                .then(function (answer) {
                  if (answer.again === "y") {
                    start();
                } else {
                  console.clear()
                  connection.end()
                  }
                  
                })

            }
          )
        })
    })
}
