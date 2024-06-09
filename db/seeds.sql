--@block
INSERT INTO department (name)
VALUES 
    ('Marketing'), 
    ('Finance'), 
    ('Information Technology'), 
    ('Sales'), 
    ('Customer Service'),
    ('Human Resources');

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
    ('regional sales manager', 110000, 4);

--@block
INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Sara', 'Pratt', 1),
    ('Kole', 'Calhoun', 2),
    ('Blaise', 'Mann', 3),
    ('Kaiden', 'Allen', 4),
    ('Will', 'Kirby', 5),
    ('Ariya', 'Bush', 6),
    ('Calvin', 'Edwards', 7),
    ('Blake', 'Shepard', 8),
    ('Emmeline', 'Nash', 9),
    ('Asa', 'Lynch', 10),
    ('Quinn', 'Holmes', 11),
    ('Dani', 'Frye', 12),
    ('Sarai', 'Cline', 13),
    ('Luis', 'Richardson', 14),
    ('Jeffery', 'Hammond', 6),
    ('Kyle', 'Atkins', 6),
    ('Adan', 'Guerra', 12);