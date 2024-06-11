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

//menu doesn't work for this function
async function addEmployee(){
    const role = await pool.query('SELECT * FROM role');
    const roleChoices = role.rows.map(role => ({
    name: role.title,
    value: role.id,
  }));
  const employees = await pool.query('SELECT * FROM employee');
  const managerChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

    inquirer.prompt([
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'firstName',
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'lastName',
        },
        {
            type: 'input',
            message: `What is the employee's role?`,
            name: 'employeeRole',
            choices: roleChoices,
        },
        {
            type: 'list',
            message: `Who is the employee's manager?`,
            name: 'manager',
            choices: managerChoices,
        },
    ])
    .then((answers) => {
        pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.firstName, answers.lastName, answers.employeeRole, answers.manager]);//fix this
        console.log(`Added employee: ${answers.firstName} ${answers.lastName}`);
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
    .then((answers) => {
        pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department]);// fixthis
        console.log(`Added role: ${answers.title}`);
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
    const roleChoices = role.rows.map(role => ({
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
    .then((answers) => {
        pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role, answers.employee]);//need to fix
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
    .then((answers) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
        console.log(`Added department: ${answers.name}`);
        menu();
    });
};

menu();