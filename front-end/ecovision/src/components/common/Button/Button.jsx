import React from 'react';
import styles from './Button.module.css';

const Button = ({ label, onClick, type = 'button' }) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

