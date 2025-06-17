import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import logo from '../../assets/images/LOGO.jpg';
import Button from '../../components/common/Button/Button';

const RegisterPage = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    repetirSenha: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.senha !== form.repetirSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Cadastro:', form);
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Di2win" className={styles.logo} />

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="repetirSenha"
          placeholder="Repita a senha"
          value={form.repetirSenha}
          onChange={handleChange}
          required
        />

        <Button type="submit" label="Cadastrar" />
        <p>Já tem uma conta? <a href="/">Voltar ao login</a></p>
      </form>
    </div>
  );
};

export default RegisterPage;

