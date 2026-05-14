import { render } from '@testing-library/react';
import NewsDetails from './NewsDetails';

describe('NewsDetails', () => {
  it('should render without breaking', () => {
    render(<NewsDetails />);
  });
});
