var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var products = [];
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});


function start() {
    inquirer
      .prompt([{
        name: "productID",
        type: "input",
        message: "What product ID would you like to purchase?",
        //choices: ["POST", "BID"]
      },
    {
        name: "productAmount",
        type: "input",
        message: "How much would you like to purchase?",
    }])
      .then(function(answer) {
        // based on their answer, either update product and amount or say invalid entry.
        if (!isNaN(answer.productID) && !isNaN(answer.productAmount)) {
            if(answer.productAmount < products[answer.productID-1].stock_quantity){
                updateProduct(answer.productID, answer.productAmount);
            }
            else {
                console.log("Invalid Entry")
              start();
            }
        }
        else {
            console.log("Invalid Entry")
          start();
        }
      });
}

// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

function updateProduct(productID, amount) {
  console.log("Updating all quantities...\n");
  var newAmount = products[productID-1].stock_quantity - amount;
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newAmount
      },
      {
        id: productID
      }
    ],
    function(err, res) {
        console.log("Successful Purchase! You spent: $" + products[productID-1].price * amount)
      //console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      readProducts();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    function(err, res) {
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all products...\n");
    var table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
        colWidths: [5, 20, 20, 20, 20]
    })
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++){
        products.push(res[i]);
        table.push(
            [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        )
    }
    console.log(table.toString());
    start();
   // connection.end();
  });
}
