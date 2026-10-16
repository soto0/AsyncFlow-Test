import { useEffect, useId, useRef, type ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ open, title, onClose, children }: ModalProps) => {
    const ref = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            if (typeof dialog.showModal === 'function') dialog.showModal();
            else dialog.setAttribute('open', '');
        } else if (!open && dialog.open) {
            if (typeof dialog.close === 'function') dialog.close();
            else dialog.removeAttribute('open');
        }
    }, [open]);

    return (
        <dialog
            ref={ref}
            className={styles.dialog}
            aria-labelledby={titleId}
            onCancel={(e) => {
                e.preventDefault();
                onClose();
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {open && (
                <div className={styles.content}>
                    <header className={styles.header}>
                        <h2 id={titleId} className={styles.title}>
                            {title}
                        </h2>
                        <button type='button' className={styles.close} onClick={onClose} aria-label='Закрыть'>
                            ×
                        </button>
                    </header>
                    {children}
                </div>
            )}
        </dialog>
    );
};
