import styles from './styles/Loading.module.css';

export default function Loading() {
  return (
    <section className={styles.loadingContainer}>
      <h5 data-testid="loading-element">Carregando...</h5>
    </section>
  );
}
