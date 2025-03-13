import React from 'react';
import styles from './SectionBelowHeader.module.css';

const SectionBelowHeader: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p>Over the Cast</p>
        <h1>
          TikTok como inovação na era digital, <br />
          com Rafael Kiso
        </h1>
        <p>
          Os principais desafios na priorização <br />
          no desenvolvimento de novos produtos.
        </p>
        <button className={styles.button}>Reproduzir agora</button>
      </div>
    </section>
  );
};

export default SectionBelowHeader;
