const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: "Jan Kowalski", email: "jan@example.com" },
      { id: 2, name: "Anna Nowak", email: "anna@example.com" },
    ],
  });
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    data: { id, name: "Jan Kowalski", email: "jan@example.com" },
  });
});

router.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Brak wymaganych pól: name, email",
    });
  }

  res.status(201).json({
    success: true,
    message: "Użytkownik utworzony",
    data: { id: 3, name, email },
  });
});

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  res.json({
    success: true,
    message: "Użytkownik zaktualizowany",
    data: { id, name, email },
  });
});

router.delete("/users/:id", (req, res) => {
  res.json({
    success: true,
    message: "Użytkownik usunięty",
  });
});

module.exports = router;