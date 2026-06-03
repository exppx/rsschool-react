import { createContext } from 'react';

export type ModalContextValue = {
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextValue>({
  closeModal: () => {},
});
