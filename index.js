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
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add an Employee",
          "Add a Role",
          "Add a Department",
          "Update an Employee's Role",
          "Quit"
        //   "Update an Employee's Manager",
        //   "Delete an Employee",
        //   "Delete a Role",
        //   "Delete a Department",
        //   "View a Department's Budget",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action-list) {
        case "View All Employees":
          viewEes();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Departments":
          viewDepts();
          break;
        case "Add an Employee":
          addEe();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add a Department":
          addDept();
          break;
        case "Update an Employee's Role":
          updateEeRole();
          break;
        case "Quit":
          connection.end();
          break;
        default:
          console.log(`Please select an action: ${answer.action-list}`);
          break;
      }
    });
};
// view functions
const viewEes = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("Employees: ", res);
  });
  action();
};
const viewRoles = () => {
    const query = "SELECT * FROM work_role";
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table("Roles: ", res);
    });
    action();
  };
  const viewDepts = () => {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table("Departments: ", res);
    });
    action();
  };

// add functions
const addEe = () =>
inquirer
  .prompt([
    {
      message: 'Enter first name of new employee:',
      type: 'input',
      name: 'eeFirstName',
    },
    {
      message: 'Enter last name of new employee:',
      type: 'input',
      name: 'eeLastName',
    },
    {
      message: 'Enter Role ID of new employee:',
      type: 'input',
      name: 'eeRole',
    },
    {
      message: 'Enter Manager ID of new employee:',
      type: 'input',
      name: 'eeMgrId',
    },
  ])
  .then(answer => {
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answer.eeFirstName,
        last_name: answer.eeLastName,
        role_id: answer.eeRole,
        manager_id: answer.eeMgrId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(
          `You have created the employee: ${answer.eeFirstName} ${answer.eeLastName}.`
        );
        action();
      }
    );
  });

const addRole = () =>
inquirer
  .prompt([
    {
      message: 'Enter a new Title: ',
      type: 'input',
      name: 'newRoleTitle',
    },
    {
      message: 'Enter the Salary for this Title: ',
      type: 'input',
      name: 'newRoleSalary',
    },
    {
      message: 'Enter a Department ID for this Title: ',
      type: 'input',
      name: 'newRoleDeptId',
    },
  ])
  .then(answer => {
    connection.query(
      'INSERT INTO work_role SET ?',
      {
        title: answer.newRoleTitle,
        salary: answer.newRoleSalary,
        department_id: answer.newRoleDeptId,
      },
      function(err, res) {
        if (err) throw err;
        console.log(
          `You have created the Role: ${answer.newRoleTitle}.`
        );
        action();
      }
    );
  });

const addDept = () =>
inquirer
    .prompt([
      {
        message: 'Enter a new Department Name: ',
        type: 'input',
        name: 'newDeptName',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          dept_name: answer.newDeptName,
        },
        function(err, res) {
          if (err) throw err;
          console.log(
            `You have created the Department: ${answer.newDeptName}.`
          );
          action();
        }
      );
    });

// update role function
const updateEeRole = () => {
    const eeListArray = [];
    const roleListArray = [];
    connection.query(
        `SELECT CONCAT (employee.first_name, ' ', employee.last_name) as employee FROM all_ee_db.employee`,
        (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            eeListArray.push(res[i].employee);
    }
    connection.query(
        `SELECT title FROM all_ee_db.work_role`,
        (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleListArray.push(res[i].title);
        }
    
    inquirer
        .prompt([
        {
            name: 'name',
            type: 'list',
            message: `Whose role would you like to change?`,
            choices: eeListArray,
        },
        {
            name: 'work_role',
            type: 'list',
            message: 'What should his/her role be?',
            choices: roleListArray,
        },
        ])
            .then(answers => {
            let currentRole;
            const name = answers.name.split(' ');
            connection.query(
                `SELECT id FROM all_ee_db.work_role WHERE title = '${answers.work_role}'`,
                (err, res) => {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    currentRole = res[i].id;
                }
                connection.query(
                    `UPDATE all_ee_db.employee SET role_id = ${currentRole} WHERE first_name= '${name[0]}' AND last_name= '${name[1]}';`,
                    (err, res) => {
                    if (err) throw err;
                    console.log(`You have successfully updated the role.`);
                    action();
                    }
                );
            }
            );
        });
        }
    ); 
    }
    );
};
