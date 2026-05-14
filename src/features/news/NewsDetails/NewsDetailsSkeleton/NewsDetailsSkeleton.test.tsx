import { render } from '@testing-library/react';
import NewsDetailsSkeleton from './NewsDetailsSkeleton';

describe('NewsDetailsSkeleton', () => {
  it('should render without breaks', () => {
    render(<NewsDetailsSkeleton />);
  });
});
