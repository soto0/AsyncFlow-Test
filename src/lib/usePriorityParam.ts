import { useCallback, useEffect, useState } from 'react';
import { isPriority, type PriorityFilter } from '../types/task';

const PARAM = 'priority';

const readFromUrl = (): PriorityFilter => {
    const value = new URLSearchParams(window.location.search).get(PARAM);
    return isPriority(value) ? value : 'all';
};

export const usePriorityParam = () => {
    const [filter, setFilterState] = useState<PriorityFilter>(readFromUrl);

    useEffect(() => {
        const onPopState = () => setFilterState(readFromUrl());
        window.addEventListener('popstate', onPopState);

        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const setFilter = useCallback((next: PriorityFilter) => {
        const url = new URL(window.location.href);

        if (next === 'all') url.searchParams.delete(PARAM);
        else url.searchParams.set(PARAM, next);

        window.history.pushState(null, '', url);
        setFilterState(next);
    }, []);

    return [filter, setFilter] as const;
};
