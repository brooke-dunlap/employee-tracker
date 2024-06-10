const inquirer = require('inquirer');
const pool = require('./config/connections');

const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View all employees', 'Add employee', 'View all roles', 'Update employee role', 'Add role', 'View all departments', 'Add department', 'Quit'],
        }
    ])
    .then((action) => {
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
            break;
        case 'Quit':
            break;
        }
    });
}

function viewAllEmployees(){
    pool.query('SELECT * FROM employee', (err, {rows}) => console.log(rows));
    menu();
};

async function addEmployee(){
    const managerList = await pool.query('SELECT * FROM role');
    const employeeRole = await pool.query();

    inquirer.prompt([
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'first-name',
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'last-name',
        },
        {
            type: 'input',
            message: `What is the employee's role?`,
            name: 'employee-role',
            choices: employeeRole,
        },
        {
            type: 'list',
            message: `Who is the employee's manager?`,
            name: 'employee-manager',
            choices: managerList,
        },
    ])
    .then((name) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
        menu();
    });
};

function viewAllRoles(){
    pool.query('SELECT * FROM role', (err, {rows}) => console.log(rows));
    menu();
};

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: '',
        },
    ])
    .then((name) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
        menu();
    });
};

function updateRole(){
    inquirer.prompt([
        {
            type: 'list',
            message:`Which employee's role do you want to update?`,
            name: 'role-update',
            choices: '',
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            name: 'role-name',
        },
    ])
};

function viewAllDepartments(){
    pool.query('SELECT * FROM department', (err, {rows}) => console.log(rows));
    menu();
};

function addDeparment(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name',
        },
    ])
    .then((name) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
        menu();
    });
};

