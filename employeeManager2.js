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

const employeeSearch  = () => {
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
const departmentSearch  = () => {
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

const managerSearch = () => {
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

const addEmployee = () => {
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
    .then ((answer) => {
    (answer.managerId == 0) 
    let query =   `INSERT INTO employee SET ?`;
    connection.query(query,
        {
            first_name: `${answer.firstName}`,
            last_name: `${answer.lastName}`,
            role_id: `${answer.role}`,
        },
    (err, res) => {
    if (err) throw err;
    console.log(`${res.affectedRows} employee added!\n`);
    runSearch();
    }
);
     });
     }
     ;

const deleteEmployee = () => {
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
          message: "Enter employee's last name: ", 
        }
      ])
    .then((answer) => {
      let query =  `DELETE FROM employee WHERE last_name = '${answer.lastName}' AND first_name = '${answer.firstName}'`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} employee deleted!\n`);
        runSearch();
      });
    })
  }

const updateRole = () => {
  console.log("updating new employee role...\n");
  inquirer.prompt([
      {
        name: 'empId',
        type: 'input',
        message: "Enter employee's id: ", 
      },
      {
        name: 'roleId',
        type: 'list',
        message: "Enter employee's new role ID: ",
        choices: function() {

        return  [1,2,3,4,5,6,7,8,9,10]
        }
      },
    ]).then(answer => {
      console.log('ANSWER=>', answer)

      let QUERY = `UPDATE employee SET role_id = ? WHERE id = ?`
      connection.query(QUERY,[answer.roleId, answer.empId],function(err,data) {
        if(err)console.log(err)
        console.log('Updated employee role Id')
        runSearch()
      })
    }).catch(err => {
      console.log(err)
    })
}


 
connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

