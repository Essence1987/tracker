SELECT
  e.id AS `Employee ID`,
  e.first_name AS `First Name`,
  e.last_name AS `Last Name`,
  r.title AS `Job Title`,
  d.name AS `Department`,
  r.salary AS `Salary`,
  CONCAT(m.first_name, ' ', m.last_name) AS `Manager`
FROM
  employees e
  INNER JOIN roles r ON e.role_id = r.id
  INNER JOIN departments d ON r.department_id = d.id
  LEFT JOIN employees m ON e.manager_id = m.id
WHERE
  e.manager_id = ?;
