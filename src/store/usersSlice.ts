import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StoredUser } from '@/types/users';
import { COUNTRIES_LIST } from '@/constants/countries';
import type { RootState } from './store';

export interface UsersState {
  users: StoredUser[];
  recentUser: StoredUser | null;
  countries: string[];
}

const initialState: UsersState = {
  users: [],
  recentUser: null,
  countries: COUNTRIES_LIST,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<StoredUser>) => {
      state.users.push(action.payload);
      state.recentUser = action.payload;
    },
    resetRecentUser: (state) => {
      state.recentUser = null;
    },
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectRecentUser = (state: RootState) => state.users.recentUser;
export const selectCountries = (state: RootState) => state.users.countries;

export const { addUser, resetRecentUser } = usersSlice.actions;

export default usersSlice.reducer;
