import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/users';
import { COUNTRIES_LIST } from '@/constants/countries';
import type { RootState } from './store';

export interface UsersState {
  users: User[];
  countries: string[];
}

const initialState: UsersState = {
  users: [],
  countries: COUNTRIES_LIST,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectCountries = (state: RootState) => state.users.countries;

export default usersSlice.reducer;
