import { ModalContext } from '@/contexts/ModalContext';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTestStore } from '@/__tests__/createTestStore';
import UncontrolledForm from './UncontrolledForm';
import { Provider } from 'react-redux';
import { ValidationError } from 'yup';
import { mockUser } from '@/__tests__/mocks';

const mockValidate = vi.hoisted(() => vi.fn());
vi.mock('@/schemas/userSchema', () => ({
  getUserSchema: () => ({
    validate: mockValidate,
  }),
}));

const mockToBase64 = vi.hoisted(() => vi.fn());
vi.mock('@/utils/toBase64', () => ({
  toBase64: mockToBase64,
}));

describe('UncontrolledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender() {
    const mockCloseModal = vi.fn();
    const store = createTestStore();

    mockToBase64.mockResolvedValue('base64-image');

    render(
      <Provider store={store}>
        <ModalContext.Provider value={{ closeModal: mockCloseModal }}>
          <UncontrolledForm />
        </ModalContext.Provider>
      </Provider>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const passwordInput = screen.getByLabelText(/^password\*$/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const user = userEvent.setup();

    return {
      mockCloseModal,
      store,
      nameInput,
      passwordInput,
      submitButton,
      user,
    };
  }

  it('should render without breaking', () => {
    const { submitButton } = customRender();

    expect(submitButton).toBeInTheDocument();
  });

  it('should show password strength', async () => {
    const { user, passwordInput } = customRender();

    await user.type(passwordInput, '123456');

    expect(screen.getByText(/weak|medium|strong/i)).toBeInTheDocument();
  });

  it('should display validation errors', async () => {
    const { user, submitButton } = customRender();
    const validationError = new ValidationError('');
    validationError.inner = [
      { path: 'name', message: 'Invalid name' },
      { path: 'email', message: 'Invalid email' },
      { path: 'age', message: 'Invalid age' },
      { path: 'sex', message: 'Invalid sex' },
      { path: 'image', message: 'Invalid image' },
      { path: 'password', message: 'Invalid password' },
      { path: 'repeatedPassword', message: 'Invalid repeatedPassword' },
      { path: 'country', message: 'Invalid country' },
      { path: 'termsAndConditions', message: 'Invalid termsAndConditions' },
    ] as ValidationError[];
    mockValidate.mockRejectedValue(validationError);

    await user.click(submitButton);

    expect(screen.getByText('Invalid name')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Invalid age')).toBeInTheDocument();
    expect(screen.getByText('Invalid sex')).toBeInTheDocument();
    expect(screen.getByText('Invalid image')).toBeInTheDocument();
    expect(screen.getByText('Invalid password')).toBeInTheDocument();
    expect(screen.getByText('Invalid repeatedPassword')).toBeInTheDocument();
    expect(screen.getByText('Invalid country')).toBeInTheDocument();
    expect(screen.getByText('Invalid termsAndConditions')).toBeInTheDocument();
  });

  it('should not display validation error if its path is not defined', async () => {
    const { user, submitButton } = customRender();
    const validationError = new ValidationError('');
    validationError.inner = [
      { path: undefined, message: 'Invalid name' },
    ] as ValidationError[];
    mockValidate.mockRejectedValue(validationError);

    await user.click(submitButton);

    expect(screen.queryByText('Invalid name')).not.toBeInTheDocument();
  });

  it('should save user on valid submit', async () => {
    const { user, mockCloseModal, submitButton, store } = customRender();
    mockValidate.mockResolvedValue(mockUser);

    await user.click(submitButton);

    expect(mockToBase64).toHaveBeenCalled();
    await waitFor(() => {
      expect(store.getState().users.users).toHaveLength(1);
    });
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('should reset form after successful submit', async () => {
    const { user, nameInput, submitButton } = customRender();
    mockValidate.mockResolvedValue(mockUser);

    await user.type(nameInput, 'John');

    expect(nameInput).toHaveValue('John');

    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
    });
  });

  it('should remove recent user after timeout', async () => {
    const { user, submitButton, store } = customRender();
    mockValidate.mockResolvedValue(mockUser);

    await user.click(submitButton);

    expect(store.getState().users.recentUser).not.toBeNull();

    await new Promise((resolve) => {
      setTimeout(resolve, 3100);
    });

    expect(store.getState().users.recentUser).toBeNull();
  });

  it('should not overwrite first validation error', async () => {
    const { user, submitButton } = customRender();

    const validationError = new ValidationError('');
    validationError.inner = [
      { path: 'email', message: 'first error' },
      { path: 'email', message: 'second error' },
    ] as ValidationError[];
    mockValidate.mockRejectedValue(validationError);

    await user.click(submitButton);

    expect(screen.getByText('first error')).toBeInTheDocument();
    expect(screen.queryByText('second error')).not.toBeInTheDocument();
  });

  it('should log unexpected error', async () => {
    const { user, submitButton } = customRender();
    const unexpectedError = new Error('');
    mockValidate.mockRejectedValue(unexpectedError);
    const spy = vi.spyOn(console, 'error');

    await user.click(submitButton);

    expect(spy).toHaveBeenCalled();
  });
});
