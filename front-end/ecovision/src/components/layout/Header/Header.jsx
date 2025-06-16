import React from 'react';
import { Link } from 'react-router-dom'; // necessário para navegação SPA
import styles from './Header.module.css';
import logo from '../../../assets/images/LOGO.jpg';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" className={styles.logo} />
      <nav className={styles.nav}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/detection">Detector</Link>
      </nav>
    </header>
  );
};

export default Header;
