import { Provider } from 'react-redux';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchNewsByDetails } from '@news/api/fetchNewsByDetails';
import { TEXT } from '@/constants/text';
import { createTestStore } from '@/__tests__/store';
import { mockArticle } from '@/__tests__/mocks';
import { toggleSelectNews } from '@news/store';
import NewsFlyout from './NewsFlyout';

vi.mock('@news/api/fetchNewsByDetails', () => ({
  fetchNewsByDetails: vi.fn(),
}));

describe('NewsFlyout.text', () => {
  const mockedFetchNewsByDetails = vi.mocked(fetchNewsByDetails);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender(options: { reject?: boolean } = { reject: false }) {
    const store = createTestStore();

    if (options.reject) {
      mockedFetchNewsByDetails.mockRejectedValue(new Error('Fetch error'));
    } else {
      mockedFetchNewsByDetails.mockResolvedValue(mockArticle);
    }

    const user = userEvent.setup();

    return {
      store,
      user,
      ...render(
        <Provider store={store}>
          <NewsFlyout />
        </Provider>
      ),
    };
  }

  it('should render without breaking', () => {
    customRender();
  });

  it('should not render if no news selected', () => {
    const { container } = customRender();

    expect(container).toBeEmptyDOMElement();
  });

  it('should show number of selected news', () => {
    const { store } = customRender({ reject: true });

    act(() => {
      store.dispatch(toggleSelectNews('testId1'));
      store.dispatch(toggleSelectNews('testId2'));
    });

    screen.getAllByText(/2/).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should show error message on download fail', async () => {
    const { store, user } = customRender({ reject: true });
    act(() => {
      store.dispatch(toggleSelectNews('testId'));
    });

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await user.click(downloadButton);

    expect(
      screen.getByText(TEXT.features.news.newsFlyout.error)
    ).toBeInTheDocument();
  });

  it('should show trigger download on download button click', async () => {
    const { store, user } = customRender();
    act(() => {
      store.dispatch(toggleSelectNews('testId'));
    });

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await user.click(downloadButton);

    expect(mockedFetchNewsByDetails).toHaveBeenCalledExactlyOnceWith('testId');
  });

  it('should unselect all news if Unselect all button is clicked', async () => {
    const { store, user } = customRender();
    act(() => {
      store.dispatch(toggleSelectNews('testId1'));
      store.dispatch(toggleSelectNews('testId2'));
    });

    const unselectButton = screen.getByRole('button', {
      name: TEXT.features.news.newsFlyout.unselect,
    });
    await user.click(unselectButton);

    expect(store.getState().news.selectedIds).toHaveLength(0);
  });
});
