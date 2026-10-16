import { mockTasks } from '../data/mockTasks';
import { storage } from '../lib/storage';
import type { NewTask, Task } from '../types/task';

const STORAGE_KEY = 'asyncflow:tasks';
const LATENCY_MS = import.meta.env.MODE === 'test' ? 0 : 600;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const readAll = (): Task[] => {
    const stored = storage.get<Task[]>(STORAGE_KEY);
    return Array.isArray(stored) ? stored : mockTasks;
};

export const tasksApi = {
    async list(): Promise<Task[]> {
        await delay(LATENCY_MS);
        return readAll();
    },

    async create(input: NewTask): Promise<Task> {
        await delay(LATENCY_MS / 2);

        const task: Task = {
            id: crypto.randomUUID(),
            title: input.title.trim(),
            description: input.description?.trim() || undefined,
            priority: input.priority,
            status: 'todo',
            createdAt: new Date().toISOString()
        };

        storage.set(STORAGE_KEY, [task, ...readAll()]);

        return task;
    }
};
