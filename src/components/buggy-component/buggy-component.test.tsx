import { render } from '@testing-library/react';
import BuggyComponent from './buggy-component';

describe('BuggyComponent', () => {
  it('should not throw error if shouldThrow is false', () => {
    expect(() => render(<BuggyComponent shouldThrow={false} />)).not.toThrow();
  });

  it('should throw error if shouldThrow is true', () => {
    expect(() => render(<BuggyComponent shouldThrow />)).toThrow();
  });
});
