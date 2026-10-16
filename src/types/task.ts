export const PRIORITIES = ['high', 'medium', 'low'] as const;

export type Priority = (typeof PRIORITIES)[number];

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    status: TaskStatus;
    createdAt: string;
}

export type NewTask = Pick<Task, 'title' | 'description' | 'priority'>;

export type PriorityFilter = Priority | 'all';

export const PRIORITY_LABELS: Record<Priority, string> = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
    todo: 'К выполнению',
    in_progress: 'В работе',
    done: 'Готово'
};

export const isPriority = (value: unknown): value is Priority => typeof value === 'string' && (PRIORITIES as readonly string[]).includes(value);
