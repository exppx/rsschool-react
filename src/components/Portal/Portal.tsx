import type React from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  wrapperId?: string;
};

function Portal({ children }: PortalProps) {
  const wrapperElement = document.getElementById('modal-root')!;

  return createPortal(children, wrapperElement);
}

export default Portal;
