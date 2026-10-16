import type { Task } from '../types/task';
import { countByPriority, filterByPriority } from './filterTasks';

const make = (id: string, priority: Task['priority']): Task => ({
    id,
    title: id,
    priority,
    status: 'todo',
    createdAt: '2026-01-01T00:00:00.000Z'
});

const tasks = [make('a', 'high'), make('b', 'low'), make('c', 'high'), make('d', 'medium')];

describe('filterByPriority', () => {
    it('returns all tasks for "all"', () => {
        expect(filterByPriority(tasks, 'all')).toEqual(tasks);
    });

    it('keeps only tasks with the selected priority', () => {
        expect(filterByPriority(tasks, 'high').map((t) => t.id)).toEqual(['a', 'c']);
    });

    it('returns an empty list when nothing matches', () => {
        expect(filterByPriority([make('x', 'low')], 'high')).toEqual([]);
    });
});

describe('countByPriority', () => {
    it('counts tasks per priority including total', () => {
        expect(countByPriority(tasks)).toEqual({ all: 4, high: 2, medium: 1, low: 1 });
    });
});
