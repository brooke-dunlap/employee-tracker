--@block
TRUNCATE TABLE employee RESTART IDENTITY CASCADE;
TRUNCATE TABLE role RESTART IDENTITY CASCADE;
TRUNCATE TABLE department RESTART IDENTITY CASCADE;

--@block
INSERT INTO department (name)
VALUES 
    ('Marketing'), 
    ('Finance'), 
    ('Information Technology'), 
    ('Sales'), 
    ('Customer Service'),
    ('Human Resources')
ON CONFLICT (name) DO NOTHING;

--@block
INSERT INTO role (title, salary, department_id)
VALUES
    ('marketing analyst', 60000, 1),
    ('marketing assistant', 75000, 1),
    ('marketing director', 90000, 1),
    ('chief finance officer', 150000, 2),
    ('financial adviser', 80000, 2),
    ('customer service rep', 50000, 5),
    ('customer service manager', 65000, 5),
    ('information security analyst', 85000, 3),
    ('network administrator', 85000, 3),
    ('human resources specialist', 70000, 6),
    ('human resources manager', 85000, 6),
    ('sales rep', 80000, 4),
    ('account manager', 90000, 4),
    ('regional sales manager', 110000, 4)
ON CONFLICT (title) DO NOTHING; 

--@block
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Sara', 'Pratt', 1, NULL),
    ('Kole', 'Calhoun', 2, NULL),
    ('Blaise', 'Mann', 3, 1),
    ('Kaiden', 'Allen', 4 ,2),
    ('Will', 'Kirby', 5, NULL),
    ('Ariya', 'Bush', 6, NULL),
    ('Calvin', 'Edwards', 7 ,3),
    ('Blake', 'Shepard', 8, NULL),
    ('Emmeline', 'Nash', 9, NULL),
    ('Asa', 'Lynch', 10, NULL),
    ('Quinn', 'Holmes', 11, 4),
    ('Dani', 'Frye', 12, NULL),
    ('Sarai', 'Cline', 13, NULL),
    ('Luis', 'Richardson', 14, 5),
    ('Jeffery', 'Hammond', 6, NULL),
    ('Kyle', 'Atkins', 6, NULL),
    ('Adan', 'Guerra', 12, NULL)
ON CONFLICT DO NOTHING;