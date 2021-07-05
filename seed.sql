USE all_ee_db;

INSERT INTO department (dept_name)
VALUES ('Direction'), ('Acting'), ('Management'), ('Lighting'), ('Sound'), ('Sets');

INSERT INTO work_role (title, salary, department_id)
VALUES ('Director', 100000, 1), ('Assistant Director', 40000, 1), ('Lead Actor', 150000, 2), ('Understudy', 60000, 2), ('Actor', 90000, 2), ('Stage Manager', 70000, 3), ('Assistant Stage Manager', 30000, 3), ('Stage Hand', 20000, 3), ('Lighting Designer', 80000, 4), ('Electrician', 50000, 4), ('Techie', 20000, 4), ('Sound Designer', 70000, 5), ('Sound Technician', 20000, 5), ('Set Designer', 90000, 6), ('Construction Lead', 60000, 6), ('Set Builder', 20000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bossy','Bosserpants', 1, null), ('Donna', 'Prima', 3, 1), ('Nancy', 'Backup', 4, 1), ('Hammy', 'Helper', 2, 1), ('Norman', 'Nobody', 5, 1), ('Peter', 'Pushyguy', 6, 1), ('Imelda', 'Igethat', 7, 6), ('Walt', 'Whatchaneed', 8, 6), ('Brenda', 'Brightone', 9, 1), ('Ziggy', 'Zipzap', 10, 9), ('Connie', 'Connector', 11, 10), ('William', 'Whatchasay', 12, 1), ('Irene', 'Iheardthat', 13, 12), ('Isaac', 'Ibildit', 14, 1), ('Brenda', 'Builder', 15, 14), ('Helen', 'Hammerer', 16, 15), ('Norman', 'Nailer', 16, 15);
