const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const SECRET = '123456'; // coloque em variável de ambiente no ideal

router.post('/', (req, res) => {
  const { userId, code } = req.body;

  if (!userId || !code) return res.status(400).json({ error: 'Dados incompletos' });

  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no banco de dados' });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (
      user.code2fa !== code ||
      Date.now() > user.code2fa_expiration
    ) {
      return res.status(401).json({ error: 'Código inválido ou expirado' });
    }

    // Limpa o código 2FA
    db.run('UPDATE users SET code2fa = NULL, code2fa_expiration = NULL WHERE id = ?', [userId]);

    // Gera o JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Autenticado com sucesso' });
  });
});

module.exports = router;
