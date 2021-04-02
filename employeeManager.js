const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require("fs");
const util = require("util");

const path = require("path");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
//  port: 3308,

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
        'View all Employee roles',
        'Add Employee',
        'Delete Employee',
        'Update Employee Role',
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
            
            case 'View all Employee roles':
            managerSearch();
            break;
    
            case 'Add Employee':
            addEmployee();
              break;
    
            case 'Delete Employee':
            deleteEmployee();
            break;
    
            case 'Update Employee Role':
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
          `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.salary, department.name AS department `;
          query +=
          `FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)`;
          query +=
          `ORDER BY employee.id ASC `;
          connection.query(query, (err, res) => {
          if (err) throw err; 
          console.log(res);
         // console.log(`Employee: ${employee_db.employees.id} || Role: ${employee_db.employees.role_id}`)
          runSearch();
          }
          );
          };
      
       departmnentSearch  = () => {
  console.log('Selecting all department...\n');
  let query = 
`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.salary, department.name AS department `;
query +=
`FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)`;
query +=
`ORDER BY employee.id ASC `;
connection.query(query, (err, res) => {
if (err) throw err; 
console.log(res);
// console.log(`Employee: ${employee_db.employee.id} || Role: ${employee_db.employee.role_id}`)
runSearch();
}
); 
};

departmnentSearch  = () => {
  console.log('Selecting all department...\n');
  let query = 
`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.salary, department.name AS department `;
query +=
`FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)`;
query +=
`ORDER BY employee.id ASC `;
connection.query(query, (err, res) => {
if (err) throw err; 
console.log(res);
// console.log(`Employee: ${employee_db.employee.id} || Role: ${employee_db.employee.role_id}`)
runSearch();
}
); 
};


addEmployee  = () => {
  //         const addEmployee = () => {
  //         inquirer
  //           .prompt([
  //       {
  //         name: 'id',
  //         type: 'input',
  //         message: 'Enter employee id: ',
  //         validate(value) {
  //       if (isNaN(value) === false) {
  //         return true;
  //       }
  //       return false;
  //     },
  //   },
  //   {
  //     name: 'firstName',
  //     type: 'input',
  //     message: "Enter employee's first name: ",
  //     validate(value) {
  //       if (isNaN(value) === false) {
  //         return true;
  //       }
  //       return false;
  //       },  
  //     },
  //     {
  //       name: 'lastName',
  //       type: 'input',
  //       message: "Enter employee's last name: ",
  //       validate(value) {
  //         if (isNaN(value) === false) {
  //           return true;
  //         }
  //         return false;
  //         },  
  //       },
  //       {
  //         name: 'role',
  //         type: 'input',
  //         message: "Enter employee's roleid?: ",
  //         //should this be choices?
  //         validate(value) {
  //           if (isNaN(value) === false) {
  //             return true;
  //           }
  //           return false;
  //           },  
  //         },
  //         {
  //           name: 'manager',
  //           type: 'input',
  //           message: "Enter employee's manager id: ",
  //           validate(value) {
  //             if (isNaN(value) === false) {
  //               return true;
  //             }
  //             return false;
  //             },  
  //           },
  //     ])
  //     .then(answer) = () => {
  // //console.log("add new employee data...\n");
  // const query =   'INSERT INTO employee_db.employee SET ?';
  // connection.query(query, [answer.id, answer.firstName, answer,lastName, answer,role, answer,manager], (err, res) => {
  //     if (err) throw err;
  //     res.forEach(({id, first_name, last_name, role_id, manager_id }) =>
  //     console.log("`New Employee: ${employee_db.employee.id} || Role: ${employee_db.employee.role_id}`"");
  //     )
  //     );
  //    runSearch();
  //   });
  //   }
  // };

  //         //   const deleteEmployee = () => {
  //         //     inquirer
  //         //       .prompt([
  //         //   {
  //         //     name: 'id',
  //         //     type: 'input',
  //         //     message: 'Enter employee id: ',
  //         //     validate(value) {
  //         //   if (isNaN(value) === false) {
  //         //     return true;
  //         //   }
  //         //   return false;
  //         // },
  //         // .then(answer) = () => {
  //         //   //console.log("delete employee data...\n");
  //         //   const query =   'DELETE FROM employee_db.employees WHERE ?';
  //         //   connection.query(query, [answer.id], (err, res) => {
  //         //       if (err) throw err;
  //         //       res.forEach(({id, first_name, last_name, role_id, manager_id }) =>
  //         //       console.log(`${res.affectedRows} deleted!\n`);   
  //         //         `  `
  //         //       )
  //         //       );
                
  //         //       connection.end();
  //         //     });
  //         //     }



          connection.connect((err) => {
            if (err) throw err;
            runSearch();
          });
          
  
 
