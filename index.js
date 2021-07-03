const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const { listenerCount } = require("events");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "/.env/DB_USER",
  password: "/.env/DB_PW",
  database: "/.env/DB_NAME",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("THEATER EMPLOYEE MANAGEMENT");
  action();
});

// db detail request list
const action = () => {
  inquirer
    .prompt([
      {
        name: "action-list",
        type: "rawlist",
        message: "What do you want to do?",
        choices: [
          "view all employees",
          "view all employees by role",
          "view all employees by department",
          "add employee",
          "add role",
          "add department",
          "update employee role",
        //   "update employee manager",
        //   "delete employee",
        //   "delete role",
        //   "delete department",
        //   "view department budget",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action-list) {
        case "view all employees":
          viewEmployees();
          break;
        case "view all employees by role":
          employeesByRole();
          break;
        default:
          console.log(`Invalid action: ${answer.action-list}`);
          break;
      }
    });
};
// db join construction
const viewEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    console.table(res);
  });
  action();
};

const employeesByRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt({
        name: "select_role",
        type: "rawlist",
        message: "What role do you want to list employees by?",
        choices() {
          const choiceArray = [];
          res.forEach(({ title }) => {
            choiceArray.push(title);
          });
          return choiceArray;
        },
      })
      .then((answer) => {
        console.log(answer);
        const query =
          "SELECT employee.first_name, employee.last_name, role.id FROM employee JOIN role ON employee WHERE employee.role_id = role.id";
        connection.query(query, (err, res) => {
          console.log(res);
          console.table(res);
        });
      });
  });
};
