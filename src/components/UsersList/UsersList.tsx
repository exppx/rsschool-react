import { useSelector } from 'react-redux';
import { selectRecentUser, selectUsers } from '@/store/usersSlice';

import styles from './UsersList.module.scss';

function UsersList() {
  const users = useSelector(selectUsers);
  const recentUser = useSelector(selectRecentUser);

  return (
    <ul className={styles['users-list']}>
      {users.map(({ id, name, email, age, sex, image, password, country }) => (
        <li
          key={email}
          className={`${styles['user']} ${recentUser?.id === id ? styles['user_recent'] : ''}`}
        >
          <span className={styles['user__info']}>Name: {name}</span>
          <span className={styles['user__info']}>Email: {email}</span>
          <span className={styles['user__info']}>Age: {age}</span>
          <span className={styles['user__info']}> Sex: {sex}</span>
          <span className={styles['user__info']}>Password: {password}</span>
          <span className={styles['user__info']}>Country: {country}</span>
          <img
            className={styles['user__image']}
            src={image}
            alt={`image of ${name}`}
          />
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
