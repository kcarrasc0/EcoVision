const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);
    db.run(
      `INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)`,
      [nome, email, hash],
      function (err) {
        if (err) {
          return res.status(400).json({ error: 'Email já cadastrado.' });
        }
        res.json({ message: 'Usuário cadastrado com sucesso!' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
