import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal"
      >
        <input />
        <input />
      </Modal>
      <button onClick={() => setIsOpen(true)}>OpenModal</button>
    </div>
  );
}

export default MainPage;
