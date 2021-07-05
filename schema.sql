DROP DATABASE IF EXISTS all_ee_db;
CREATE database all_ee_db;

USE all_ee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NULL,
  PRIMARY KEY (id),
);

CREATE TABLE work_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NULL,
  salary DECIMAL NULL,
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES work_role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM employee; 
SELECT * FROM work_role; 
SELECT * FROM department; 