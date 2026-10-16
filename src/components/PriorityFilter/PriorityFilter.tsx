import { useId } from 'react';
import { PRIORITIES, PRIORITY_LABELS, type PriorityFilter as Filter } from '../../types/task';
import styles from './PriorityFilter.module.css';

interface PriorityFilterProps {
    value: Filter;
    counts: Record<Filter, number>;
    onChange: (value: Filter) => void;
}

const OPTIONS: { value: Filter; label: string }[] = [
    { value: 'all', label: 'Все приоритеты' },
    ...PRIORITIES.map((p) => ({ value: p, label: PRIORITY_LABELS[p] }))
];

export const PriorityFilter = ({ value, counts, onChange }: PriorityFilterProps) => {
    const id = useId();

    return (
        <div className={styles.filter}>
            <label htmlFor={id} className={styles.label}>
                Приоритет
            </label>
            <div className={styles.selectWrap} data-priority={value}>
                <select id={id} className={styles.select} value={value} onChange={(e) => onChange(e.target.value as Filter)}>
                    {OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label} ({counts[option.value]})
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
