import { useId, useState, type FormEvent } from 'react';
import { DESCRIPTION_MAX, TITLE_MAX, validateTask, type TaskFormErrors } from '../../lib/validateTask';
import { PRIORITIES, PRIORITY_LABELS, type NewTask, type Priority } from '../../types/task';
import styles from './CreateTaskForm.module.css';

interface CreateTaskFormProps {
    onSubmit: (values: NewTask) => Promise<unknown>;
    onCancel: () => void;
}

const INITIAL: NewTask = { title: '', description: '', priority: 'medium' };

export const CreateTaskForm = ({ onSubmit, onCancel }: CreateTaskFormProps) => {
    const [values, setValues] = useState<NewTask>(INITIAL);
    const [errors, setErrors] = useState<TaskFormErrors>({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const id = useId();

    const update = <K extends keyof NewTask>(key: K, value: NewTask[K]) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nextErrors = validateTask(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            const firstInvalid = e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]');
            firstInvalid?.focus();

            return;
        }

        setLoading(true);
        setSubmitError(null);

        try {
            await onSubmit(values);
        } catch {
            setSubmitError('Не удалось создать задачу. Попробуйте ещё раз.');
        } finally {
            setLoading(false);
        }
    };

    const fieldId = (name: string) => `${id}-${name}`;

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
                <label htmlFor={fieldId('title')} className={styles.label}>
                    Название <span aria-hidden='true'>*</span>
                </label>
                <input
                    id={fieldId('title')}
                    className={styles.input}
                    value={values.title}
                    maxLength={TITLE_MAX}
                    autoFocus
                    aria-required='true'
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? fieldId('title-error') : undefined}
                    onChange={(e) => update('title', e.target.value)}
                />
                {errors.title && (
                    <p id={fieldId('title-error')} className={styles.error} role='alert'>
                        {errors.title}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor={fieldId('description')} className={styles.label}>
                    Описание
                </label>
                <textarea
                    id={fieldId('description')}
                    className={styles.input}
                    rows={4}
                    value={values.description}
                    maxLength={DESCRIPTION_MAX}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? fieldId('description-error') : undefined}
                    onChange={(e) => update('description', e.target.value)}
                />
                {errors.description && (
                    <p id={fieldId('description-error')} className={styles.error} role='alert'>
                        {errors.description}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor={fieldId('priority')} className={styles.label}>
                    Приоритет
                </label>
                <div className={styles.selectWrap} data-priority={values.priority}>
                    <select
                        id={fieldId('priority')}
                        className={`${styles.input} ${styles.select}`}
                        value={values.priority}
                        aria-invalid={Boolean(errors.priority)}
                        onChange={(e) => update('priority', e.target.value as Priority)}
                    >
                        {PRIORITIES.map((priority) => (
                            <option key={priority} value={priority}>
                                {PRIORITY_LABELS[priority]}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.priority && (
                    <p className={styles.error} role='alert'>
                        {errors.priority}
                    </p>
                )}
            </div>

            {submitError && (
                <p className={styles.error} role='alert'>
                    {submitError}
                </p>
            )}

            <div className={styles.actions}>
                <button type='button' className='btn btn-secondary' onClick={onCancel}>
                    Отмена
                </button>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'Создаём…' : 'Создать'}
                </button>
            </div>
        </form>
    );
};
