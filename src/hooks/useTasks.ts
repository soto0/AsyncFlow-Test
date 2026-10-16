import { useCallback, useEffect, useState } from 'react';
import { tasksApi } from '../api/tasksApi';
import type { NewTask, Task } from '../types/task';

type Status = 'loading' | 'success' | 'error';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [status, setStatus] = useState<Status>('loading');

    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        tasksApi.list().then(
            (data) => {
                if (cancelled) return;

                setTasks(data);
                setStatus('success');
            },
            () => {
                if (!cancelled) setStatus('error');
            }
        );

        return () => {
            cancelled = true;
        };
    }, [reloadKey]);

    const reload = useCallback(() => {
        setStatus('loading');
        setReloadKey((key) => key + 1);
    }, []);

    const addTask = useCallback(async (input: NewTask) => {
        const created = await tasksApi.create(input);
        setTasks((prev) => [created, ...prev]);
        return created;
    }, []);

    return { tasks, status, addTask, reload };
};
