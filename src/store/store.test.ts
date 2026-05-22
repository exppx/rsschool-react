import { store } from './store';

describe('store', () => {
  it('should have news slice', () => {
    expect(store.getState().news).not.toBeUndefined();
  });
});
