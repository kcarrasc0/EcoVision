import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../assets/images/LOGO.jpg';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const Header = () => {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.nome) {
        setNome(decoded.nome);
      } else {
        console.error('Token inválido ou sem nome');
        setNome('');
      }
    } else {
      setNome('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <nav className={styles.nav}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/detection">Detector</Link>
      </nav>
      <div className={styles.user}>
        Olá, <strong>{nome || 'Usuário'}</strong>
        <button onClick={handleLogout} className={styles.logout}>Sair</button>
      </div>
    </header>
  );
};

export default Header;
