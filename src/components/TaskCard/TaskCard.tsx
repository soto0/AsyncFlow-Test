import { PRIORITY_LABELS, STATUS_LABELS, type Task } from '../../types/task';
import styles from './TaskCard.module.css';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' });

export const TaskCard = ({ task }: { task: Task }) => (
    <article className={styles.card} data-priority={task.priority}>
        <div className={styles.meta}>
            <span className={styles.priority}>{PRIORITY_LABELS[task.priority]}</span>
            <span className={styles.status} data-status={task.status}>
                {STATUS_LABELS[task.status]}
            </span>
        </div>
        <h3 className={styles.title}>{task.title}</h3>
        {task.description && <p className={styles.description}>{task.description}</p>}
        <time className={styles.date} dateTime={task.createdAt}>
            {dateFormatter.format(new Date(task.createdAt))}
        </time>
    </article>
);
