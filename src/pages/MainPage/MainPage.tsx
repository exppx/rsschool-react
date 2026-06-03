import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import UncontrolledForm from '@/components/UncontrolledForm/UncontrolledForm';
import UsersList from '@/components/UsersList/UsersList';

import styles from './MainPage.module.scss';

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles['main']}>
      <div className={styles['main__buttons']}>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Uncontrolled Form"
        >
          <div className={styles['form-container']}>
            <UncontrolledForm />
          </div>
        </Modal>
        <button onClick={() => setIsOpen(true)}>Uncontrolled</button>
      </div>

      <div className={styles['main__users']}>
        <UsersList />
      </div>
    </div>
  );
}

export default MainPage;
