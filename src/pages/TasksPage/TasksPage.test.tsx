import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockTasks } from '../../data/mockTasks';
import { TasksPage } from './TasksPage';

const renderPage = async () => {
    const user = userEvent.setup();
    render(<TasksPage />);
    const list = await screen.findByRole('list', { name: 'Список задач' });
    return { user, list };
};

beforeEach(() => {
    window.history.replaceState(null, '', '/');
});

describe('TasksPage', () => {
    it('renders mock tasks after loading', async () => {
        const { list } = await renderPage();
        expect(within(list).getAllByRole('listitem')).toHaveLength(mockTasks.length);
    });

    it('filters tasks by priority and syncs URL', async () => {
        const { user, list } = await renderPage();
        await user.selectOptions(screen.getByRole('combobox', { name: 'Приоритет' }), 'high');

        const highCount = mockTasks.filter((t) => t.priority === 'high').length;
        expect(within(list).getAllByRole('listitem')).toHaveLength(highCount);
        expect(window.location.search).toBe('?priority=high');
    });

    it('reads initial filter from URL', async () => {
        window.history.replaceState(null, '', '/?priority=low');
        const { list } = await renderPage();
        const lowCount = mockTasks.filter((t) => t.priority === 'low').length;
        expect(within(list).getAllByRole('listitem')).toHaveLength(lowCount);
    });

    it('shows validation errors and does not create an empty task', async () => {
        const { user } = await renderPage();
        await user.click(screen.getByRole('button', { name: /Создать задачу/ }));
        await user.click(screen.getByRole('button', { name: 'Создать' }));

        expect(screen.getByRole('alert')).toHaveTextContent('Введите название задачи');
    });

    it('creates a task via modal and shows it in the list', async () => {
        const { user, list } = await renderPage();
        await user.click(screen.getByRole('button', { name: /Создать задачу/ }));

        const dialog = within(screen.getByRole('dialog'));

        await user.type(dialog.getByLabelText(/Название/), 'Написать тесты');
        await user.type(dialog.getByLabelText('Описание'), 'Покрыть основные сценарии');
        await user.selectOptions(dialog.getByLabelText('Приоритет'), 'high');
        await user.click(dialog.getByRole('button', { name: 'Создать' }));

        expect(await within(list).findByText('Написать тесты')).toBeInTheDocument();
        expect(within(list).getAllByRole('listitem')).toHaveLength(mockTasks.length + 1);
        expect(screen.queryByRole('heading', { name: 'Новая задача' })).not.toBeInTheDocument();
    });

    it('closes the modal on cancel', async () => {
        const { user } = await renderPage();
        await user.click(screen.getByRole('button', { name: /Создать задачу/ }));
        expect(screen.getByRole('heading', { name: 'Новая задача' })).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Отмена' }));
        expect(screen.queryByRole('heading', { name: 'Новая задача' })).not.toBeInTheDocument();
    });
});
