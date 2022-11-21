import styles from './styles/EmptyTable.module.css';

export default function EmptyTable() {
  return (
    <section className={styles.emptyTableContainer}>
      <h5>Nenhuma transação foi encontrada</h5>
    </section>
  );
}
