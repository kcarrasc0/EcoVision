import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import logo from '../../assets/images/LOGO.jpg';
import Button from '../../components/common/Button/Button';
import * as jwt_decode from 'jwt-decode';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', senha: '', code: '', userId: '' });
  const [nome, setNome] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, senha: form.senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setForm(prev => ({ ...prev, userId: data.userId }));
        setStep(2);

        // Salvar token no localStorage
        localStorage.setItem('token', data.token);

        // Decodificar token para pegar nome
        const decoded = jwt_decode.default(data.token);
        setNome(decoded.nome);
      } else {
        alert(data.error || 'Erro no login');
      }
    } catch (error) {
    }
  };

  const handleVerify = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: form.userId, code: form.code }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        alert(data.error || 'Código inválido');
      }
    } catch (error) {
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.form}>
        {nome && <p style={{ marginBottom: '10px' }}>Olá, {nome}!</p>}
        {step === 1 ? (
          <>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
            />
            <Button label="Login" onClick={handleLogin} />
          </>
        ) : (
          <>
            <input
              type="text"
              name="code"
              placeholder="Digite o código de 6 dígitos"
              value={form.code}
              onChange={handleChange}
            />
            <Button label="Verificar Código" onClick={handleVerify} />
          </>
        )}
        <div className={styles.divider}>Ou</div>
        <p id="cdc">
          Não possui uma conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
