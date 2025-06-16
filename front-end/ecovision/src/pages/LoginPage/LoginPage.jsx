import React from 'react';
import styles from './LoginPage.module.css';
import logo from '../../assets/images/LOGO.jpg';
import Button from '../../components/common/Button/Button';

const LoginPage = () => {
  const handleLogin = () => {
    // Redireciona para o dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.form}>
        <input type="text" placeholder="Insira seu nome de usuário ou e-mail" />
        <input type="password" placeholder="Digite sua senha" />
        <Button label="Entrar" onClick={handleLogin} />
        <div className={styles.divider}>Ou</div>
        
        <p id='cdc'>Não possui uma conta? <a href="/register">Cadastre-se</a></p>
      </div>
    </div>
  );
};

export default LoginPage;

