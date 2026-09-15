import styles from './styles/styles.module.css';

export default function MikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.mik_layout}>
      {children}
    </div>
  );
}