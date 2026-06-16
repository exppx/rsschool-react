import { store } from './store';

describe('store', () => {
  it('should export valid store', () => {
    expect(store.getState().users).toBeDefined();
  });
});
