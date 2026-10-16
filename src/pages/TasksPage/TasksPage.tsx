import { useMemo, useState } from 'react';
import { CreateTaskForm } from '../../components/CreateTaskForm/CreateTaskForm';
import { Modal } from '../../components/Modal/Modal';
import { PriorityFilter } from '../../components/PriorityFilter/PriorityFilter';
import { TaskList } from '../../components/TaskList/TaskList';
import { useTasks } from '../../hooks/useTasks';
import { countByPriority, filterByPriority } from '../../lib/filterTasks';
import { usePriorityParam } from '../../lib/usePriorityParam';
import type { NewTask } from '../../types/task';
import styles from './TasksPage.module.css';

export const TasksPage = () => {
    const { tasks, status, addTask, reload } = useTasks();
    const [filter, setFilter] = usePriorityParam();
    const [isModalOpen, setModalOpen] = useState(false);

    const visibleTasks = useMemo(() => filterByPriority(tasks, filter), [tasks, filter]);
    const counts = useMemo(() => countByPriority(tasks), [tasks]);

    const handleCreate = async (values: NewTask) => {
        await addTask(values);
        setModalOpen(false);
    };

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Задачи</h1>
                    <p className={styles.subtitle}>{status === 'success' ? `Показано ${visibleTasks.length} из ${tasks.length}` : ' '}</p>
                </div>
                <div className={styles.actions}>
                    <PriorityFilter value={filter} counts={counts} onChange={setFilter} />
                    <button type='button' className='btn btn-primary' onClick={() => setModalOpen(true)}>
                        + Создать задачу
                    </button>
                </div>
            </header>

            {status === 'error' ? (
                <div className={styles.error} role='alert'>
                    <p>Не удалось загрузить задачи.</p>
                    <button type='button' className='btn btn-secondary' onClick={reload}>
                        Повторить
                    </button>
                </div>
            ) : (
                <TaskList tasks={visibleTasks} loading={status === 'loading'} />
            )}

            <Modal open={isModalOpen} title='Новая задача' onClose={() => setModalOpen(false)}>
                <CreateTaskForm onSubmit={handleCreate} onCancel={() => setModalOpen(false)} />
            </Modal>
        </main>
    );
};
