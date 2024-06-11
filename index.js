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
    .then((answer) => {
    switch (answer.action) {
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
            updateEmployeeRole();
            break;
        case 'Add role':
            addRole();
            break;
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'Add department':
            addDepartment();
            break;
        case 'Quit':
            pool.end();
            break;
        }
    });
}

async function viewAllEmployees(){
    await pool.query('SELECT first_name, last_name FROM employee', (err, {rows}) => console.log(rows));
    menu();
};

async function addEmployee(){
    const role = await pool.query('SELECT * FROM role');
    const roleChoices = role.rows.map(role => ({
    name: role.title,
    value: role.id,
  }));
  const employees = await client.query('SELECT * FROM employee');
  const managerChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

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
            choices: roleChoices,
        },
        {
            type: 'list',
            message: `Who is the employee's manager?`,
            name: 'employee-manager',
            choices: managerChoices,
        },
    ])
    .then((firstName, lastName, employeeRole, manager) => {
        pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, employeeRole, manager]);//fix this
        console.log(`Added employee: ${firstName} ${lastName}`);
        menu();
    });
};

async function viewAllRoles(){
    await pool.query('SELECT title FROM role', (err, {rows}) => console.log(rows));
    menu();
};

async function addRole(){
    const department = await pool.query('SELECT * FROM department');
    const departmentChoices = department.rows.map(department => ({
        name: department.name,
        value: department.id,
      }));

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'department',
            choices: departmentChoices,
        },
    ])
    .then((name, salary, department_id) => {
        pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [name, salary, department_id]);// fixthis
        console.log(`Added role: ${name}`);
        menu();
    });
};

async function updateEmployeeRole(){
    const employee = await pool.query('SELECT * FROM employee');
    const employeeChoices = employee.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    const role = await pool.query('SELECT * FROM role')
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id,
      }));

    inquirer.prompt([
        {
            type: 'list',
            message:`Which employee's role do you want to update?`,
            name: 'employee',
            choices: employeeChoices,
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            name: 'role',
            choices: roleChoices,
        },
    ])
    .then((employee_id, role_id) => {
        pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);//need to fix
        console.log(`Updated employee's role`);
        menu();
    });
};

async function viewAllDepartments(){
    await pool.query('SELECT name FROM department', (err, {rows}) => console.log(rows));
    menu();
};

function addDepartment(){
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

menu();