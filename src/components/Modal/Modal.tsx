import { useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import Portal from '@/components/Portal/Portal';

import styles from './Modal.module.scss';

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ title, isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const activeIndexRef = useRef<number>(0);

  const previousFocusedElement = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
    previousFocusedElement.current?.focus();
  }, [onClose]);

  function handleOverlayClick(event: React.MouseEvent) {
    if (event.target !== event.currentTarget) return;

    handleClose();
  }

  function handleTab(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;

    const total = focusableElementsRef.current.length;

    if (total === 0) return;

    if (!event.shiftKey) {
      if (activeIndexRef.current + 1 === total) {
        activeIndexRef.current = 0;
      } else {
        activeIndexRef.current += 1;
      }
    } else {
      if (activeIndexRef.current - 1 < 0) {
        activeIndexRef.current = total - 1;
      } else {
        activeIndexRef.current -= 1;
      }
    }

    focusableElementsRef.current[activeIndexRef.current].focus();
    event.preventDefault();
  }

  useEffect(() => {
    if (!isOpen) return;

    previousFocusedElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (modalRef.current) {
      focusableElementsRef.current = Array.from(
        modalRef.current.querySelectorAll('a, button, input, textarea, select')
      );
    }

    document.addEventListener('keydown', handleTab);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    document.documentElement.addEventListener('keydown', closeOnEscape);

    return () => {
      document.documentElement.removeEventListener('keydown', closeOnEscape);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className={styles.overlay}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.modalHeader}>
            <div className={styles.modalTitleContainer}>
              <h2 className={styles.modalTitle}>{title}</h2>
            </div>
            <button
              className={styles.modalCloseButton}
              onClick={handleClose}
              ref={closeButtonRef}
            >
              ✕
            </button>
          </div>

          {children}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
