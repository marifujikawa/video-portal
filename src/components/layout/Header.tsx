import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch, FaUser, FaChevronDown, FaPlay, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <FaPlay className={styles.logoIcon} />
        <span className={styles.logoText}>VideoVerse</span>
      </Link>
      
      {!searchVisible ? (
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
      ) : (
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar vídeos..."
            className={styles.searchInput}
            autoFocus
          />
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </form>
      )}
      
      <div className={styles.headerIcons}>
        <div 
          className={styles.icon} 
          onClick={handleSearchToggle}
          aria-label={searchVisible ? "Close search" : "Open search"}
        >
          {searchVisible ? <FaTimes /> : <FaSearch />}
        </div>
        <FaUser className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;