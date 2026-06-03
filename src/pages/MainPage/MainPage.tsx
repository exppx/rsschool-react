import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import UncontrolledForm from '@/components/UncontrolledForm/UncontrolledForm';
import ControlledForm from '@/components/ControlledForm/ControlledForm';
import UsersList from '@/components/UsersList/UsersList';

import styles from './MainPage.module.scss';

function MainPage() {
  const [isOpenUncontrolled, setIsOpenUncontrolled] = useState(false);
  const [isOpenControlled, setIsOpenControlled] = useState(false);

  return (
    <div className={styles['main']}>
      <div className={styles['main__buttons']}>
        <Modal
          isOpen={isOpenUncontrolled}
          onClose={() => setIsOpenUncontrolled(false)}
          title="Uncontrolled Form"
        >
          <div className={styles['form-container']}>
            <UncontrolledForm />
          </div>
        </Modal>
        <button onClick={() => setIsOpenUncontrolled(true)}>
          Uncontrolled
        </button>

        <Modal
          isOpen={isOpenControlled}
          onClose={() => setIsOpenControlled(false)}
          title="Controlled Form"
        >
          <div className={styles['form-container']}>
            <ControlledForm />
          </div>
        </Modal>
        <button onClick={() => setIsOpenControlled(true)}>Controlled</button>
      </div>

      <div className={styles['main__users']}>
        <UsersList />
      </div>
    </div>
  );
}

export default MainPage;
