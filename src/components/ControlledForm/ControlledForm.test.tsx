import { createTestStore } from '@/__tests__/createTestStore';
import { ModalContext } from '@/contexts/ModalContext';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ControlledForm from './ControlledForm';
import userEvent from '@testing-library/user-event';
import { mockFile } from '@/__tests__/mocks';

const mockToBase64 = vi.hoisted(() => vi.fn());
vi.mock('@/utils/toBase64', () => ({
  toBase64: mockToBase64,
}));

describe('ControlledForm', () => {
  function customRender() {
    const store = createTestStore();
    const mockCloseModal = vi.fn();

    render(
      <Provider store={store}>
        <ModalContext.Provider
          value={{
            closeModal: mockCloseModal,
            updateFocusableElements: vi.fn(),
          }}
        >
          <ControlledForm />
        </ModalContext.Provider>
      </Provider>
    );

    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const ageInput = screen.getByLabelText(/^age/i);
    const sexMaleInput = screen.getByLabelText(/^male/i);
    const imageInput = screen.getByLabelText(/image/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const countryInput = screen.getByLabelText(/country/i);
    const termsAndConditionsInput = screen.getByLabelText(/accept terms/i);

    return {
      store,
      mockCloseModal,
      user,
      submitButton,
      nameInput,
      emailInput,
      ageInput,
      sexMaleInput,
      imageInput,
      passwordInput,
      confirmPasswordInput,
      countryInput,
      termsAndConditionsInput,
    };
  }

  it('should render without breaking', () => {
    customRender();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should disable submit initially', () => {
    const { submitButton } = customRender();

    expect(submitButton).toBeDisabled();
  });

  it('should show validation errors', async () => {
    const {
      user,
      nameInput,
      emailInput,
      ageInput,
      imageInput,
      passwordInput,
      confirmPasswordInput,
      countryInput,
      termsAndConditionsInput,
    } = customRender();

    await user.type(nameInput, 'john');
    await user.type(emailInput, 'wrongemail');
    await user.type(ageInput, '-20');
    await user.upload(imageInput, new File(['image'], 'file.pdf'));
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password');
    await user.type(countryInput, 'Germ');
    await user.click(termsAndConditionsInput);
    await user.click(termsAndConditionsInput);

    expect(await screen.findByText(/uppercase/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/include one @ symbol/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/age must be positive/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/PNG|JPEG/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/passwords must match/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/country must be chosen from the list/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/you must agree with terms and conditions/i)
    ).toBeInTheDocument();
  });

  it('should enable submit when form becomes valid', async () => {
    const {
      user,
      nameInput,
      emailInput,
      ageInput,
      sexMaleInput,
      imageInput,
      passwordInput,
      confirmPasswordInput,
      countryInput,
      termsAndConditionsInput,
      submitButton,
    } = customRender();

    await user.type(nameInput, 'John');
    await user.type(emailInput, 'john@test.com');
    await user.type(ageInput, '20');
    await user.click(sexMaleInput);
    await user.upload(imageInput, mockFile);
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.type(countryInput, 'Germany');
    await user.click(termsAndConditionsInput);

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it('should submit form and close modal', async () => {
    const {
      user,
      nameInput,
      emailInput,
      ageInput,
      sexMaleInput,
      imageInput,
      passwordInput,
      confirmPasswordInput,
      countryInput,
      termsAndConditionsInput,
      submitButton,
      store,
      mockCloseModal,
    } = customRender();

    await user.type(nameInput, 'John');
    await user.type(emailInput, 'john@test.com');
    await user.type(ageInput, '20');
    await user.click(sexMaleInput);
    await user.upload(imageInput, mockFile);
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.type(countryInput, 'Germany');
    await user.click(termsAndConditionsInput);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCloseModal).toHaveBeenCalled();
    });

    expect(store.getState().users.users.length).toBe(1);
  });

  it('should reset recent user from the store after timeout', async () => {
    const {
      user,
      nameInput,
      emailInput,
      ageInput,
      sexMaleInput,
      imageInput,
      passwordInput,
      confirmPasswordInput,
      countryInput,
      termsAndConditionsInput,
      submitButton,
      store,
    } = customRender();

    await user.type(nameInput, 'John');
    await user.type(emailInput, 'john@test.com');
    await user.type(ageInput, '20');
    await user.click(sexMaleInput);
    await user.upload(imageInput, mockFile);
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.type(countryInput, 'Germany');
    await user.click(termsAndConditionsInput);
    await user.click(submitButton);

    await new Promise((resolve) => {
      setTimeout(resolve, 3100);
    });

    expect(store.getState().users.recentUser).toBeNull();
  });
});
