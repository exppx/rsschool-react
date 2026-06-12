import { createContext } from 'react';

export type ModalContextValue = {
  closeModal: () => void;
  updateFocusableElements: () => void;
};

export const ModalContext = createContext<ModalContextValue>({
  closeModal: () => {},
  updateFocusableElements: () => {},
});
