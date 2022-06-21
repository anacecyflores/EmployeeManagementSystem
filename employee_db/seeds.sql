INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lord", "Farquad",1,NULL),
       ("Elliot", "Smith" ,3,NULL),
       ("Frida ", "Kahlo",2 ,NULL),
       ("Gabriel", "Garcia-Marquez", 4,NULL),
       ("Isabel", "Allende",4, NULL),
       ("Danny ", "De Vito", 5, 1),
       ("Jimmi", "Hendrix",3, NULL),
       ("Leonardo", " Da Vinci" ,2,2);

       INSERT INTO department (department_name)
VALUES("movies"),
       ("art"),
       ("music"),
       ("books"),
       ("books"),
       ("entertainment"),
       ("music"),
       ("Management");

       INSERT INTO roles ( title, salary, department_id)
VALUES ( "villain", 500000, 1),
       ( "artist", 20000, 2),
       ( "writer", 45000, 3),
       ( "musician", 50000, 3),
       ( "writer", 45000, 4),
       ( "manager", 100000, 5),
       ( "manager", 100000, 5);