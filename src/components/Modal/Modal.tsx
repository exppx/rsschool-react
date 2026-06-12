import { useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import Portal from '@/components/Portal/Portal';
import { ModalContext } from '@/contexts/ModalContext';

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
  const firstFocusableElementRef = useRef<HTMLElement>(null);
  const lastFocusableElementRef = useRef<HTMLElement>(null);

  const initialFocusedElement = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
    initialFocusedElement.current?.focus();
  }, [onClose]);

  function handleOverlayClick(event: React.MouseEvent) {
    if (event.target !== event.currentTarget) return;

    handleClose();
  }

  function handleTab(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;

    const target = event.target;

    if (!event.shiftKey) {
      if (target === lastFocusableElementRef.current) {
        event.preventDefault();
        firstFocusableElementRef.current?.focus();
      }
    } else {
      if (target === firstFocusableElementRef.current) {
        event.preventDefault();
        lastFocusableElementRef.current?.focus();
      }
    }
  }

  const updateFocusableElements = useCallback(() => {
    if (!modalRef.current) return;

    const focusableElements = Array.from(
      modalRef.current.querySelectorAll(
        'a, button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled)'
      )
    ).filter((e) => e instanceof HTMLElement);

    firstFocusableElementRef.current = focusableElements[0];
    lastFocusableElementRef.current =
      focusableElements[focusableElements.length - 1];
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    initialFocusedElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (modalRef.current) updateFocusableElements();

    closeButtonRef.current?.focus();

    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, updateFocusableElements]);

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
    <ModalContext.Provider
      value={{ closeModal: handleClose, updateFocusableElements }}
    >
      <Portal>
        <div
          className={styles['overlay']}
          onPointerDown={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles['modal']} ref={modalRef}>
            <div className={styles['modal__header']}>
              <div className={styles['modal__title-container']}>
                <h2 className={styles['modal__title']}>{title}</h2>
              </div>
              <button
                className={styles['modal__close-button']}
                onClick={handleClose}
                ref={closeButtonRef}
                aria-label="close button"
              >
                ✕
              </button>
            </div>

            <div className={styles['content']}>{children}</div>
          </div>
        </div>
      </Portal>
    </ModalContext.Provider>
  );
}

export default Modal;
