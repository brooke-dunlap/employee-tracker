const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View all employees', 'Add employee', 'View all roles', 'Update employee role', 'Add role', 'View all departments', 'Add department'],
    },
]);

switch (action) {
    case 'View all employees':
        viewAllEmployees();
        break;
    case 'Add employee':
        addEmployee();
        break;
    case 'View all roles':
        viewAllRoles();
        break;
    case 'Update employee role':
        updateRole();
        break;
    case 'Add role':
        addRole();
        break;
    case 'View all departments':
        viewAllDepartments();
        break;
    case 'Add department':
        addDeparment();
}

function viewAllEmployees(){};
function addEmployee(){};
function viewAllRoles(){};
function addRole(){};
function updateRole(){};
function viewAllDepartments(){};
function addDeparment(){};