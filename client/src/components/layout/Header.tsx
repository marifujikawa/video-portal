import React from 'react';
import Link from 'next/link';
import { FaSearch, FaUser, FaChevronDown, FaPlay } from 'react-icons/fa';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <FaPlay className={styles.logoIcon} />
        <span className={styles.logoText}>VideoVerse</span>
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>Categorias <FaChevronDown className={styles.arrowIcon} /></li>
          <li>Assuntos <FaChevronDown className={styles.arrowIcon} /></li>
          <li>Outras páginas <FaChevronDown className={styles.arrowIcon} /></li>
          <li>Minha Lista</li>
          <li>Lives</li>
          <li>Fórum</li>
        </ul>
      </nav>
      <div className={styles.headerIcons}>
        <FaSearch className={styles.icon} />
        <FaUser className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;