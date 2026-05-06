import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('should render without breaking', () => {
    render(<Skeleton />);
  });

  it('should receive className from props', () => {
    const testClassName = 'testClassName';
    const { container } = render(<Skeleton className={testClassName} />);

    expect(container.firstChild).toHaveClass(testClassName);
  });
});
