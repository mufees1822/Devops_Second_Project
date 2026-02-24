const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

// Store calculation history
let history = [];

/*
====================================
 HOME ROUTE
====================================
*/
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Welcome to Muhfees Calculator API!</h1>
    <p>Use POST requests to perform calculations:</p>
    <ul>
      <li>/add</li>
      <li>/subtract</li>
      <li>/multiply</li>
      <li>/divide</li>
      <li>/power</li>
      <li>/sqrt</li>
      <li>/history (GET & DELETE)</li>
    </ul>
    <p>Try testing via Postman or curl!</p>
  `);
});

/*
====================================
 BASIC OPERATIONS
====================================
*/

app.post("/add", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Inputs must be numbers" });
  }

  const result = a + b;
  history.push({ operation: "add", a, b, result });

  res.json({ result });
});

app.post("/subtract", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Inputs must be numbers" });
  }

  const result = a - b;
  history.push({ operation: "subtract", a, b, result });

  res.json({ result });
});

app.post("/multiply", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Inputs must be numbers" });
  }

  const result = a * b;
  history.push({ operation: "multiply", a, b, result });

  res.json({ result });
});

app.post("/divide", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Inputs must be numbers" });
  }

  if (b === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }

  const result = a / b;
  history.push({ operation: "divide", a, b, result });

  res.json({ result });
});

/*
====================================
 ADVANCED OPERATIONS
====================================
*/

app.post("/power", (req, res) => {
  const { base, exponent } = req.body;

  if (typeof base !== "number" || typeof exponent !== "number") {
    return res.status(400).json({ error: "Inputs must be numbers" });
  }

  const result = Math.pow(base, exponent);
  history.push({ operation: "power", base, exponent, result });

  res.json({ result });
});

app.post("/sqrt", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ error: "Input must be a number" });
  }

  if (number < 0) {
    return res.status(400).json({ error: "Cannot calculate square root of negative number" });
  }

  const result = Math.sqrt(number);
  history.push({ operation: "sqrt", number, result });

  res.json({ result });
});

/*
====================================
 HISTORY
====================================
*/

app.get("/history", (req, res) => {
  res.json(history);
});

app.delete("/history", (req, res) => {
  history = [];
  res.json({ message: "History cleared successfully" });
});

/*
====================================
 START SERVER
====================================
*/

app.listen(PORT, () => {
  console.log(`🚀 Calculator API running on port ${PORT}`);
});