import type { Task } from '../types/task';

export const mockTasks: Task[] = [
    {
        id: 't-1',
        title: 'Настроить CI/CD пайплайн',
        description: 'Lint, typecheck, тесты и сборка на каждый pull request.',
        priority: 'high',
        status: 'in_progress',
        createdAt: '2026-10-10T09:00:00.000Z'
    },
    {
        id: 't-2',
        title: 'Исправить утечку памяти в WebSocket-клиенте',
        description: 'Подписки не отписываются при размонтировании компонента.',
        priority: 'high',
        status: 'todo',
        createdAt: '2026-10-11T12:30:00.000Z'
    },
    {
        id: 't-3',
        title: 'Ревью PR с новой формой оплаты',
        priority: 'medium',
        status: 'todo',
        createdAt: '2026-10-12T08:15:00.000Z'
    },
    {
        id: 't-4',
        title: 'Обновить зависимости',
        description: 'React, Vite и типы до актуальных версий.',
        priority: 'low',
        status: 'todo',
        createdAt: '2026-10-12T14:00:00.000Z'
    },
    {
        id: 't-5',
        title: 'Добавить skeleton-загрузку в ленту',
        priority: 'medium',
        status: 'done',
        createdAt: '2026-10-13T10:45:00.000Z'
    },
    {
        id: 't-6',
        title: 'Подготовить демо для команды',
        description: 'Слайды и сценарий показа новой фичи.',
        priority: 'medium',
        status: 'in_progress',
        createdAt: '2026-10-14T16:20:00.000Z'
    },
    {
        id: 't-7',
        title: 'Поправить опечатки в документации',
        priority: 'low',
        status: 'done',
        createdAt: '2026-10-15T11:00:00.000Z'
    },
    {
        id: 't-8',
        title: 'Аудит доступности модальных окон',
        description: 'Фокус-трап, закрытие по Esc, aria-атрибуты.',
        priority: 'high',
        status: 'todo',
        createdAt: '2026-10-15T17:40:00.000Z'
    },
    {
        id: 't-9',
        title: 'Сократить размер бандла',
        priority: 'low',
        status: 'in_progress',
        createdAt: '2026-10-16T07:30:00.000Z'
    }
];
