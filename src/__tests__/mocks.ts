import type { StoredUser, User } from '@/types/users';

export const mockUser: User = {
  name: 'John',
  email: 'john@test.com',
  age: 20,
  sex: 'male',
  image: new File(['a'], 'avatar.png'),
  password: '123456',
  repeatedPassword: '123456',
  country: 'Germany',
  termsAndConditions: true,
};

export const mockStoredUser: StoredUser = {
  id: '123',
  name: 'John',
  email: 'john@test.com',
  age: 20,
  sex: 'male',
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAXYBTksmCAALAAAAAABAAEAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAATSURBVBjTY2MgFGBgQAT/gcSAEAEA+QAD/yendZ8AAAAASUVORK5CYII=',
  password: '123456',
  country: 'Germany',
};
