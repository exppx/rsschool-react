import { render } from '@testing-library/react';
import NewsListSkeleton from './NewsListSkeleton';

describe('NewsListSkeleton', () => {
  it('should render without breaking', () => {
    render(<NewsListSkeleton />);
  });
});
