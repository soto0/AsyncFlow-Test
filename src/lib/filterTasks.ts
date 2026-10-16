import { PRIORITIES, type Priority, type PriorityFilter, type Task } from '../types/task';

export const filterByPriority = (tasks: Task[], filter: PriorityFilter): Task[] =>
    filter === 'all' ? tasks : tasks.filter((task) => task.priority === filter);

export const countByPriority = (tasks: Task[]): Record<PriorityFilter, number> => {
    const counts = Object.fromEntries(PRIORITIES.map((p) => [p, 0])) as Record<Priority, number>;
    for (const task of tasks) counts[task.priority] += 1;

    return { all: tasks.length, ...counts };
};
