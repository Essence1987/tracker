SELECT 
 r.id, 
 r.title, 
 d.name 
AS 
 department, 
 r.salary 
FROM 
 roles r 
INNER JOIN 
 departments d ON r.department_id = d.id;