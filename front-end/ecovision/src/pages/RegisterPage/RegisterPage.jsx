import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './RegisterPage.module.css';
import logo from '../../assets/images/LOGO.jpg';
import Button from '../../components/common/Button/Button';

const RegisterPage = () => {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', repetirSenha: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.repetirSenha) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'As senhas não coincidem!' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: data.message,
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire({ icon: 'error', title: 'Erro', text: data.error });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Erro de conexão', text: 'Não foi possível conectar ao servidor.' });
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Di2win" className={styles.logo} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required />
        <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
        <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
        <input type="password" name="repetirSenha" placeholder="Repita a senha" value={form.repetirSenha} onChange={handleChange} required />
        <Button type="submit" label="Cadastrar" />
        <p>Já tem uma conta? <a href="/">Voltar ao login</a></p>
      </form>
    </div>
  );
};

export default RegisterPage;
