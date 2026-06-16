import { createTestStore } from '@/__tests__/createTestStore';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import UsersList from './UsersList';
import { addUser, resetRecentUser } from '@/store/usersSlice';
import { mockStoredUser } from '@/__tests__/mocks';

import styles from './UsersList.module.scss';

describe('UsersList', () => {
  function customRender(options?: {
    addUsers?: boolean | number;
    resetRecentUser?: boolean;
  }) {
    const store = createTestStore();

    if (options?.addUsers) {
      if (typeof options.addUsers === 'number') {
        for (let i = 0; i < options.addUsers; i++)
          store.dispatch(addUser(mockStoredUser));
      } else {
        store.dispatch(addUser(mockStoredUser));
      }
    }

    if (options?.resetRecentUser) {
      store.dispatch(resetRecentUser());
    }

    return {
      store,
      ...render(
        <Provider store={store}>
          <UsersList />
        </Provider>
      ),
    };
  }

  it('should render without breaking', () => {
    customRender();
  });

  it('should render empty list if no users stored', () => {
    const { container } = customRender({ addUsers: false });

    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('should render user info', () => {
    customRender({ addUsers: true });

    expect(
      screen.getByText(new RegExp(mockStoredUser.name))
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockStoredUser.image
    );
  });

  it('should highlight recent user', () => {
    customRender({ addUsers: true });

    expect(screen.getByRole('listitem')).toHaveClass(styles['user_recent']);
  });

  it('should not highlight user if no recent user', () => {
    customRender({ addUsers: true, resetRecentUser: true });

    expect(screen.getByRole('listitem')).not.toHaveClass(styles['user_recent']);
  });
});
