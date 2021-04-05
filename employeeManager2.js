const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require("fs");
const util = require("util");

const path = require("path");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306

  // Your username
  user: 'root',

  // Your password
  password: 'root',
  database: 'employee_db',
});

//start here


const runSearch = () => {  
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all Employees',
        'View all Departments',
        'View all Managers',
        'Add an Employee',
        'Delete an Employee',
        'Update an Employee Role',
      //  'Update Employee Manager',
  ],
})   
.then((data) => {
    switch (data.action) {
      case 'View all Employees':
      employeeSearch();    
      break;

      case 'View all Departments':
      departmentSearch();
      break;
      
      case 'View all Managers':
      managerSearch();
      break;

      case 'Add an Employee':
      addEmployee();
        break;

      case 'Delete an Employee':
      deleteEmployee();
      break;

      case 'Update an Employee Role':
      updateRole();
      break;

     // case 'Update Employee Manager':
      //updateManager();
     // break;
        
      default:
      console.log(`Invalid action: ${data.action}`);
      break;
  }
});
};

employeeSearch  = () => {
            console.log('Selecting all employees...\n');
            let query = 
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department `;
          query +=
          `FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)`;
          query +=
          `ORDER BY employee.id ASC `;
          connection.query(query, (err, res) => {
          if (err) throw err; 
          console.table(res);
          runSearch();
          }
          );
          };
departmentSearch  = () => {
            console.log('Selecting all departments...\n');
            let query = 
            `SELECT * FROM department`;
//            SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.salary, department.name AS department `;
//          query +=
//          `FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)`;
        connection.query(query, (err, res) => {
        if (err) throw err; 
        console.table(res);
        runSearch();
        }
        );
        };

managerSearch = () => {
        console.log('Selecting all managers...');
        let query = 
        `SELECT * FROM employee_db.employee WHERE manager_id = 1`;
        connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
        }
        );
        };

addEmployee = () => {
    console.log("Adding new employee data...\n");

        inquirer.prompt([
        {
        name: 'firstName',
        type: 'input',
        message: "Enter employee's first name: ", 
        },
        {
        name: 'lastName',
        type: 'input',
        message: "Enter employee's last name: ",
        },
        {
        name: 'role',
        type: 'input',
        message: "Enter employee's role id: ",
        },
        {
            name: 'managerId',
            type: 'input',
            message: "Enter employee's manager id: ",
            },
    ])

    //missing some stuff in this query
    .then((data) => {
    if (data.managerId == 0) {
    connection.query =   `INSERT INTO employee SET ?`,
    {
        first_name: `${data.firstName}`,
        last_name: `${data.lastName}`,
        role_id: `${data.roleId}`,
    },
    (err, res) => {
    if (err) throw err;
    console.log(`${res.affectedRows} employee added!\n`);
    runSearch();
    }
    
    } else {
    connection.query =   `INSERT INTO employee SET ?`,
        {
            first_name: `${data.firstName}`,
            last_name: `${data.lastName}`,
            role_id: `${data.roleId}`,
            manager_id: `${data.managerId}`,
        },
        (err, res) => {
        if (err) throw err;
        console.log("`${res.affectedRows} employee added!\n`");
        runSearch();
    }
    };
    }
    );
    };

deleteEmployee = () => {
    console.log('deleting an employee...');

    inquirer.prompt([
        {
        name: 'firstName',
        type: 'input',
        message: "Enter employee's first name: ", 
        },
        {
            name: 'lastName',
            type: 'input',
            message: "Enter employee's lasst name: ", 
            },
        ])
    // let query = 
    // `DELETE FROM employee_db.employee WHERE first_name=(data.firstName) and last_name=(data.lastName)`;
    // connection.query(query, (err, res) => {
    // if (err) throw err;
    // console.table(res);
    // runSearch();
     };
    ;
updateRole = () => {
console.log("updating new employee role...\n");

inquirer.prompt([
    {
    name: 'empId',
    type: 'input',
    message: "Enter employee's id: ", 
    },
    {
    name: 'role',
    type: 'list',
    message: "Enter employee's new role: ",
    choices: [
      'Engineer',
      'Account Manager',
      'Legal Advisor',
      'Manager',
    ],
},
])

//query to update employee role requires join to role table.....
// .then((data) => {
// connection.query =   `INSERT INTO employee SET ?`,
// {
//     first_name: `${data.firstName}`,
//     last_name: `${data.lastName}`,
//     role_id: `${data.roleId}`,
// },
// (err, res) => {
// if (err) throw err;
// console.log(`${res.affectedRows} employee role updated!\n`);
// runSearch();
// }
 };
 //}
//);
//};



connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });