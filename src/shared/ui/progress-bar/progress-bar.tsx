import styles from './progress-bar.module.css';

export const ProgressBar = (props: { isPlayersTurn: boolean }) => {
  return <div className={props.isPlayersTurn ? styles.progress : styles['progress-2']} />;
};
