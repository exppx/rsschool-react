import {
  mockInitialState,
  mockRootState,
  mockStoredUser,
} from '@/__tests__/mocks';
import reducer, {
  addUser,
  resetRecentUser,
  selectCountries,
  selectRecentUser,
  selectUsers,
  type UsersState,
} from './usersSlice';

describe('userSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      users: [],
      recentUser: null,
      countries: expect.any(Array),
    });
  });

  it('should add user', () => {
    const state = reducer(mockInitialState, addUser(mockStoredUser));

    expect(state.users).toEqual([mockStoredUser]);
    expect(state.recentUser).toEqual(mockStoredUser);
  });

  it('should reset recent user', () => {
    const populatedState: UsersState = {
      ...mockInitialState,
      recentUser: mockStoredUser,
    };

    const state = reducer(populatedState, resetRecentUser());

    expect(state.recentUser).toBeNull();
  });

  it('should create addUser action', () => {
    expect(addUser(mockStoredUser)).toEqual({
      type: 'users/addUser',
      payload: mockStoredUser,
    });
  });

  it('should create resetRecentUser action', () => {
    expect(resetRecentUser()).toEqual({
      type: 'users/resetRecentUser',
      payload: undefined,
    });
  });

  it('should select users', () => {
    expect(selectUsers(mockRootState)).toEqual(mockInitialState.users);
  });

  it('should select recent user', () => {
    expect(selectRecentUser(mockRootState)).toEqual(
      mockInitialState.recentUser
    );
  });

  it('should select countries', () => {
    expect(selectCountries(mockRootState)).toEqual(mockInitialState.countries);
  });
});
