import { render, screen } from '@testing-library/react';
import SearchNewsForm from './SearchNewsForm';
import userEvent from '@testing-library/user-event';

describe('SearchNewsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender() {
    const testText = 'testText';
    const savedText = 'Saved text';

    const onSubmitSpy = vi.fn();

    render(
      <SearchNewsForm
        onSubmit={onSubmitSpy}
        isLoading={false}
        savedSearch={savedText}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'search button' });
    const user = userEvent.setup();

    return {
      testText,
      savedText,
      onSubmitSpy,
      input,
      button,
      user,
    };
  }

  it('should render without breaking', () => {
    customRender();
  });

  it('should render input and button', () => {
    const { input, button } = customRender();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display passed in props term', () => {
    const { input, savedText } = customRender();

    expect(input).toHaveValue(savedText);
  });

  it('should update input value when user types', async () => {
    const { testText, input, user } = customRender();

    await user.clear(input);

    await user.type(input, testText);
    expect(input).toHaveValue(testText);

    await user.type(input, testText);
    expect(input).toHaveValue(testText + testText);
  });

  it('should call on submit if button clicked', async () => {
    const { button, user, onSubmitSpy } = customRender();

    await user.click(button);

    expect(onSubmitSpy).toHaveBeenCalledOnce();
  });
});
