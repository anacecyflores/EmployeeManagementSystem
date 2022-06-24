    INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lord", "Farquad",1,6),
       ("Elliot", "Smith" ,3,8),
       ("Frida ", "Kahlo",2 ,6),
       ("Gabriel", "Garcia-Marquez", 4,8),
       ("Isabel", "Allende",4,6),
       ("Danny ", "De Vito", 5, NULL),
       ("Jimmi", "Hendrix",3,8),
       ("Leonardo", " Da Vinci" ,2,NULL);

    INSERT INTO department (department_name)
VALUES("Movies"),
       ("Art"),
       ("Music"),
       ("Books"),
       ("Entertainment"),
       ("Management");

    INSERT INTO roles ( title, salary, department_id)
VALUES ( "villain", 500000, 1),
       ( "artist", 20000, 2),
       ( "musician", 50000, 3),
       ( "writer", 45000, 4),
       ( "manager", 100000, 5);