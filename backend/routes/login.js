const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '123456'; // use variável de ambiente

router.post('/', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no banco de dados' });
    if (!user) return res.status(401).json({ error: 'Usuário ou senha incorretos' });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Usuário ou senha incorretos' });
    }

    // Gera o código 2FA e expiração
    const code2fa = crypto.randomInt(100000, 999999).toString();
    const expiration = Date.now() + 5 * 60 * 1000;

    db.run(
      'UPDATE users SET code2fa = ?, code2fa_expiration = ? WHERE id = ?',
      [code2fa, expiration, user.id],
      (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar código 2FA' });

        console.log(`Código 2FA para ${email}: ${code2fa}`);

        // Gerar token JWT incluindo id e nome
        const tokenPayload = { userId: user.id, nome: user.nome };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ userId: user.id, message: 'Código 2FA enviado (veja no terminal)', token });
      }
    );
  });
});

module.exports = router;
