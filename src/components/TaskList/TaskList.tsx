import type { Task } from '../../types/task';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskList.module.css';

interface TaskListProps {
    tasks: Task[];
    loading: boolean;
}

export const TaskList = ({ tasks, loading }: TaskListProps) => {
    if (loading) {
        return (
            <ul className={styles.grid} aria-busy='true' aria-label='Загрузка задач'>
                {Array.from({ length: 6 }, (_, i) => (
                    <li key={i} className={styles.skeleton} />
                ))}
            </ul>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyTitle}>Задач нет</p>
                <p>Попробуйте другой фильтр или создайте первую задачу.</p>
            </div>
        );
    }

    return (
        <ul className={styles.grid} aria-label='Список задач'>
            {tasks.map((task) => (
                <li key={task.id}>
                    <TaskCard task={task} />
                </li>
            ))}
        </ul>
    );
};
