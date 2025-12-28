const assignments = {
  easy: [
    {
      id: 1,
      title: "Students & Courses Analysis",
      difficulty: "Easy",
      description:
        "Display student name, marks, and faculty by joining students and courses tables.",
      schema: `
students(
  id INT,
  name VARCHAR,
  course VARCHAR,
  marks INT
)

courses(
  id INT,
  course_name VARCHAR,
  faculty VARCHAR
)
      `,
      expectedColumns: ["name", "marks", "faculty"],
      expectedOutput: `
Alice | 85 | Dr. Sharma
Bob   | 90 | Dr. Sharma
`,
      hint: "JOIN students.course with courses.course_name"
      
    },
    {
      id: 2,
      title: "Top Scoring Students",
      difficulty: "Easy",
      description: "Display names of students who scored more than 85 marks.",
      schema: `
students(
  id INT,
  name VARCHAR,
  marks INT
)
      `,
      expectedColumns: ["name", "marks"],
      expectedOutput: `
Bob | 90
`,
      hint: "Use WHERE marks > 85"
      
    },
    {
      id: 3,
      title: "All Employees List",
      difficulty: "Easy",
      description: "Fetch all records from employees table.",
      schema: `
employees(
  id INT,
  name VARCHAR,
  department VARCHAR
)
      `,
      expectedColumns: ["id", "name", "department"],
      expectedOutput: `
1 | Amit | IT
2 | Neha | HR
`,
      hint: "Use SELECT *"
    },
    {
      id: 4,
      title: "Employees in IT Department",
      difficulty: "Easy",
      description: "List employees who belong to the IT department.",
      schema: `
employees(
  id INT,
  name VARCHAR,
  department VARCHAR
)
      `,
      expectedColumns: ["name"],
      expectedOutput: `
Amit
`,
      hint: "Filter using WHERE department = 'IT'"
    },
    {
      id: 5,
      title: "Product Prices",
      difficulty: "Easy",
      description: "Display product names and prices.",
      schema: `
products(
  id INT,
  name VARCHAR,
  price INT
)
      `,
      expectedColumns: ["name", "price"],
      expectedOutput: `
Laptop | 60000
Phone  | 30000
`,
      hint: "Select only required columns"
    },
    {
      id: 6,
      title: "Count Total Students",
      difficulty: "Easy",
      description: "Find the total number of students.",
      schema: `
students(
  id INT,
  name VARCHAR
)
      `,
      expectedColumns: ["count"],
      expectedOutput: `
5
`,
      hint: "Use COUNT(*)"
    },
    {
      id: 7,
      title: "Distinct Departments",
      difficulty: "Easy",
      description: "Find unique department names.",
      schema: `
employees(
  id INT,
  department VARCHAR
)
      `,
      expectedColumns: ["department"],
      expectedOutput: `
IT
HR
Finance
`,
      hint: "Use DISTINCT"
    },
    {
      id: 8,
      title: "Sort Products by Price",
      difficulty: "Easy",
      description: "List products sorted by price in ascending order.",
      schema: `
products(
  id INT,
  name VARCHAR,
  price INT
)
      `,
      expectedColumns: ["name", "price"],
      expectedOutput: `
Pen | 10
Book | 100
Laptop | 60000
`,
      hint: "Use ORDER BY price ASC"
    },
    {
      id: 9,
      title: "Students with NULL Marks",
      difficulty: "Easy",
      description: "Display students whose marks are NULL.",
      schema: `
students(
  id INT,
  name VARCHAR,
  marks INT
)
      `,
       expectedColumns: ["name"],
      expectedOutput: `
Ravi
`,
      hint: "Use WHERE marks IS NULL"
    },
    {
      id: 10,
      title: "Limit Records",
      difficulty: "Easy",
      description: "Fetch first 5 records from orders table.",
      schema: `
orders(
  id INT,
  amount INT
)
      `,
      expectedColumns: ["id", "amount"],
      expectedOutput: `
1 | 500
2 | 1200
`,
      hint: "Use LIMIT 5"
    },
    {
      id: 11,
      title: "Customers from Delhi",
      difficulty: "Easy",
      description: "List customers who live in Delhi.",
      schema: `
customers(
  id INT,
  name VARCHAR,
  city VARCHAR
)
      `,
      expectedColumns: ["name"],
      expectedOutput: `
Rahul
`,
      hint: "Use WHERE city = 'Delhi'"
    },
    {
      id: 12,
      title: "Total Salary",
      difficulty: "Easy",
      description: "Calculate total salary paid to employees.",
      schema: `
employees(
  id INT,
  salary INT
)
      `,
       expectedColumns: ["sum"],
      expectedOutput: `
250000
`,
      hint: "Use SUM(salary)"
    },
    {
      id: 13,
      title: "Employees Name Start with A",
      difficulty: "Easy",
      description: "Find employees whose name starts with 'A'.",
      schema: `
employees(
  id INT,
  name VARCHAR
)
      `,
      expectedColumns: ["name"],
      expectedOutput: `
Amit
`,
      hint: "Use LIKE 'A%'"
    },
    {
      id: 14,
      title: "Orders Above 1000",
      difficulty: "Easy",
      description: "Display orders with amount greater than 1000.",
      schema: `
orders(
  id INT,
  amount INT
)
      `,
       expectedColumns: ["id", "amount"],
      expectedOutput: `
2 | 1500
`,
      hint: "Use WHERE amount > 1000"
    },
    {
      id: 15,
      title: "Update Product Price",
      difficulty: "Easy",
      description: "Increase price of all products by 10%.",
      schema: `
products(
  id INT,
  price INT
)
      `,
      expectedColumns: [],
      expectedOutput: `
Prices updated
`,
      hint: "Use UPDATE products SET price = price * 1.1"
    },
  ],

  medium: [
    {
      id: 1,
      title: "Average Salary per Department",
      difficulty: "Medium",
      description: "Find average salary of employees per department.",
      schema: `
employees(
  id INT,
  department VARCHAR,
  salary INT
)
      `,
      expectedColumns: ["department", "avg"],
      expectedOutput: `
IT | 60000
HR | 45000
`,
      hint: "Use GROUP BY department"
    },
    {
      id: 2,
      title: "Students Above Class Average",
      difficulty: "Medium",
      description:
        "Find students who scored above the class average.",
      schema: `
students(
  id INT,
  name VARCHAR,
  marks INT
)
      `,
       expectedColumns: ["name"],
      expectedOutput: `
Bob
`,
      hint: "Use subquery with AVG(marks)"
    },
    {
      id: 3,
      title: "Customers with Multiple Orders",
      difficulty: "Medium",
      description:
        "Find customers who placed more than one order.",
      schema: `
customers(
  id INT,
  name VARCHAR
)

orders(
  id INT,
  customer_id INT
)
      `,
      expectedColumns: ["name"],
      expectedOutput: `
Rahul
`,
      hint: "GROUP BY customer_id HAVING COUNT(*) > 1"
    },
    {
      id: 4,
      title: "Highest Salary Employee",
      difficulty: "Medium",
      description: "Find employee with the highest salary.",
      schema: `
employees(
  id INT,
  name VARCHAR,
  salary INT
)
      `,
      expectedColumns: ["name", "salary"],
      expectedOutput: `
Amit | 90000
`,
      hint: "Use MAX(salary)"
    },
    {
      id: 5,
      title: "Department Employee Count",
      difficulty: "Medium",
      description:
        "Count employees in each department.",
      schema: `
employees(
  id INT,
  department VARCHAR
)
      `,
       expectedColumns: ["department", "count"],
      expectedOutput: `
IT | 3
HR | 2
`,
      hint: "GROUP BY department"
    },
    {
      id: 6,
      title: "Orders Per Day",
      difficulty: "Medium",
      description:
        "Find number of orders placed each day.",
      schema: `
orders(
  id INT,
  order_date DATE
)
      `,
       expectedColumns: ["order_date", "count"],
      expectedOutput: `
2024-01-01 | 5
`,
      hint: "GROUP BY order_date"
    },
    {
      id: 7,
      title: "Second Highest Salary",
      difficulty: "Medium",
      description:
        "Find the second highest salary from employees.",
      schema: `
employees(
  id INT,
  salary INT
)
      `,
      expectedColumns: ["salary"],
      expectedOutput: `
75000
`,
      hint: "ORDER BY salary DESC LIMIT 1 OFFSET 1"
    },
    {
      id: 8,
      title: "Inactive Customers",
      difficulty: "Medium",
      description:
        "Find customers who never placed an order.",
      schema: `
customers(
  id INT,
  name VARCHAR
)

orders(
  id INT,
  customer_id INT
)
      `,
      expectedColumns: ["name"],
      expectedOutput: `
Suresh
`,
      hint: "LEFT JOIN + WHERE orders.id IS NULL"
    },
    {
      id: 9,
      title: "Monthly Sales",
      difficulty: "Medium",
      description:
        "Calculate total sales per month.",
      schema: `
orders(
  id INT,
  amount INT,
  order_date DATE
)
      `,
      expectedColumns: ["month", "sum"],
      expectedOutput: `
Jan | 120000
`,
      hint: "Use GROUP BY MONTH(order_date)"
    },
    {
      id: 10,
      title: "Duplicate Emails",
      difficulty: "Medium",
      description:
        "Find duplicate email IDs.",
      schema: `
users(
  id INT,
  email VARCHAR
)
      `,
      expectedColumns: ["email"],
      expectedOutput: `
test@mail.com
`,
      hint: "GROUP BY email HAVING COUNT(*) > 1"
    },
    {
      id: 11,
      title: "Employees Without Manager",
      difficulty: "Medium",
      description:
        "Find employees who have no manager.",
      schema: `
employees(
  id INT,
  name VARCHAR,
  manager_id INT
)
      `,
       expectedColumns: ["name"],
      expectedOutput: `
CEO
`,
      hint: "WHERE manager_id IS NULL"
    },
    {
      id: 12,
      title: "Top 3 Expensive Products",
      difficulty: "Medium",
      description:
        "Find top 3 most expensive products.",
      schema: `
products(
  id INT,
  name VARCHAR,
  price INT
)
      `,
       expectedColumns: ["name", "price"],
      expectedOutput: `
Laptop | 60000
Phone  | 30000
TV     | 25000
`,
      hint: "ORDER BY price DESC LIMIT 3"
    },
    {
      id: 13,
      title: "City Wise Customer Count",
      difficulty: "Medium",
      description:
        "Count customers per city.",
      schema: `
customers(
  id INT,
  city VARCHAR
)
      `,
      expectedColumns: ["city", "count"],
      expectedOutput: `
Delhi | 4
Mumbai | 3
`,
      hint: "GROUP BY city"
    },
    {
      id: 14,
      title: "Orders With Customer Names",
      difficulty: "Medium",
      description:
        "Display order details with customer names.",
      schema: `
customers(
  id INT,
  name VARCHAR
)

orders(
  id INT,
  customer_id INT
)
      `,
      expectedColumns: ["id", "name"],
      expectedOutput: `
1 | Rahul
`,
      hint: "JOIN customers and orders"
    },
    {
      id: 15,
      title: "Products Never Ordered",
      difficulty: "Medium",
      description:
        "Find products never ordered.",
      schema: `
products(
  id INT,
  name VARCHAR
)

orders(
  id INT,
  product_id INT
)
      `,
       expectedColumns: ["name"],
      expectedOutput: `
Keyboard
`,
      hint: "LEFT JOIN + WHERE orders.product_id IS NULL"
    },
  ],

  hard: [
    {
      id: 1,
      title: "Consecutive Login Users",
      difficulty: "Hard",
      description:
        "Find users who logged in for 3 consecutive days.",
      schema: `
logins(
  user_id INT,
  login_date DATE
)
      `,
      expectedColumns: ["user_id"],
      expectedOutput: `
101
`,
      hint: "Use date difference or window functions"
    },
    {
      id: 2,
      title: "Nth Highest Salary",
      difficulty: "Hard",
      description:
        "Find the Nth highest salary.",
      schema: `
employees(
  id INT,
  salary INT
)
      `,
       expectedColumns: ["salary"],
      expectedOutput: `
70000
`,
      hint: "Use LIMIT and OFFSET or dense_rank"
    },
    {
      id: 3,
      title: "Running Total of Sales",
      difficulty: "Hard",
      description:
        "Calculate running total of daily sales.",
      schema: `
sales(
  date DATE,
  amount INT
)
      `,
       expectedColumns: ["date", "running_total"],
      expectedOutput: `
2024-01-01 | 500
2024-01-02 | 1200
`,
      hint: "Use SUM() OVER(ORDER BY date)"
    },
    {
      id: 4,
      title: "Department with Highest Avg Salary",
      difficulty: "Hard",
      description:
        "Find department with highest average salary.",
      schema: `
employees(
  id INT,
  department VARCHAR,
  salary INT
)
      `,
      expectedColumns: ["department"],
      expectedOutput: `
IT
`,
      hint: "ORDER BY AVG(salary) DESC"
    },
    {
      id: 5,
      title: "Customer Retention",
      difficulty: "Hard",
      description:
        "Find customers who ordered in consecutive months.",
      schema: `
orders(
  customer_id INT,
  order_date DATE
)
      `,
      expectedColumns: ["customer_id"],
      expectedOutput: `
201
`,
      hint: "Compare MONTH(order_date)"
    },
    {
      id: 6,
      title: "Rank Employees by Salary",
      difficulty: "Hard",
      description:
        "Rank employees based on salary.",
      schema: `
employees(
  id INT,
  name VARCHAR,
  salary INT
)
      `,
      expectedColumns: ["name", "rank"],
      expectedOutput: `
Amit | 1
`,
      hint: "Use RANK() OVER"
    },
    {
      id: 7,
      title: "Median Salary",
      difficulty: "Hard",
      description:
        "Find median salary of employees.",
      schema: `
employees(
  id INT,
  salary INT
)
      `,
      expectedColumns: ["salary"],
      expectedOutput: `
60000
`,
      hint: "Use percentile_cont or ordering"
    },
    {
      id: 8,
      title: "Gaps in Sequence",
      difficulty: "Hard",
      description:
        "Find missing numbers in ID sequence.",
      schema: `
records(
  id INT
)
      `,
      expectedColumns: ["missing_id"],
      expectedOutput: `
4
`,
      hint: "Use self join or generate_series"
    },
    {
      id: 9,
      title: "Most Frequent Product",
      difficulty: "Hard",
      description:
        "Find most frequently ordered product.",
      schema: `
orders(
  product_id INT
)
      `,
      expectedColumns: ["product_id"],
      expectedOutput: `
3
`,
      hint: "GROUP BY product_id ORDER BY COUNT(*) DESC"
    },
    {
      id: 10,
      title: "Self Join Manager Hierarchy",
      difficulty: "Hard",
      description:
        "Display employee-manager pairs.",
      schema: `
employees(
  id INT,
  name VARCHAR,
  manager_id INT
)
      `,
      expectedColumns: ["employee", "manager"],
      expectedOutput: `
Amit | Rahul
`,
      hint: "Self JOIN employees table"
    },
    {
      id: 11,
      title: "Customer Churn",
      difficulty: "Hard",
      description:
        "Find customers who stopped ordering.",
      schema: `
orders(
  customer_id INT,
  order_date DATE
)
      `,
       expectedColumns: ["customer_id"],
      expectedOutput: `
301
`,
      hint: "Use MAX(order_date)"
    },
    {
      id: 12,
      title: "Salary Gaps",
      difficulty: "Hard",
      description:
        "Find difference between consecutive salaries.",
      schema: `
employees(
  salary INT
)
      `,
       expectedColumns: ["gap"],
      expectedOutput: `
5000
`,
      hint: "Use LEAD or LAG"
    },
    {
      id: 13,
      title: "Top Performing Departments",
      difficulty: "Hard",
      description:
        "Find departments whose average salary is above company average.",
      schema: `
employees(
  department VARCHAR,
  salary INT
)
      `,
       expectedColumns: ["department"],
      expectedOutput: `
IT
`,
      hint: "Compare AVG(department) vs AVG(company)"
    },
    {
      id: 14,
      title: "First and Last Order Date",
      difficulty: "Hard",
      description:
        "Find first and last order date per customer.",
      schema: `
orders(
  customer_id INT,
  order_date DATE
)
      `,
      expectedColumns: ["customer_id", "first", "last"],
      expectedOutput: `
201 | 2023-01-01 | 2024-01-10
`,
      hint: "Use MIN and MAX"
    },
    {
      id: 15,
      title: "Overlapping Sessions",
      difficulty: "Hard",
      description:
        "Find overlapping user sessions.",
      schema: `
sessions(
  user_id INT,
  start_time DATETIME,
  end_time DATETIME
)
      `,
      expectedColumns: ["user_id"],
      expectedOutput: `
401
`,
      hint: "Compare start_time < other.end_time"
    },
  ],
};

export default assignments;