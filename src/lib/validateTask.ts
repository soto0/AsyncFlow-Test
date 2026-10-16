import { isPriority, type NewTask } from '../types/task';

export const TITLE_MIN = 3;
export const TITLE_MAX = 100;
export const DESCRIPTION_MAX = 500;

export type TaskFormErrors = Partial<Record<keyof NewTask, string>>;

export const validateTask = (values: NewTask): TaskFormErrors => {
    const errors: TaskFormErrors = {};
    const title = values.title.trim();

    if (!title) errors.title = 'Введите название задачи';
    else if (title.length < TITLE_MIN) errors.title = `Минимум ${TITLE_MIN} символа`;
    else if (title.length > TITLE_MAX) errors.title = `Максимум ${TITLE_MAX} символов`;

    if ((values.description ?? '').length > DESCRIPTION_MAX) errors.description = `Максимум ${DESCRIPTION_MAX} символов`;

    if (!isPriority(values.priority)) errors.priority = 'Выберите приоритет';

    return errors;
};
