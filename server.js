const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "username", // แทนที่ด้วยชื่อผู้ใช้ MySQL ของคุณ
  password: "password", // แทนที่ด้วยรหัสผ่าน MySQL ของคุณ
  database: "database_name" // แทนที่ด้วยชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);

  // **Bug/Code smell:** ลืมปิด connection เมื่อไม่ใช้งาน
});

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  // **Bug/Code smell:** ไม่เรียก next() ในบางกรณี
  if (req.url === "/skip") {
    res.send("Skipped");
  } else {
    next();
  }
});

// Route handling
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  // **Code smell:** ไม่ handle error และใช้ callback nested แบบไม่จำเป็น
  connection.query("SELECT 1", (err, result) => {
    if (err) console.log("DB query failed"); // ไม่ส่ง response กลับ
    res.send("About page");
  });
});

app.get("/lab", (req, res) => {
  res.send("Lab Test page!");
});

// **Bug:** ลืม handle server error
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
