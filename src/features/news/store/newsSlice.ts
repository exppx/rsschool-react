import type { RootState } from '@/store/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface NewsState {
  selectedIds: string[];
}

const initialState: NewsState = {
  selectedIds: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    toggleSelectNews: (state, action: PayloadAction<string>) => {
      const toggledNewsIndex = state.selectedIds.findIndex(
        (id) => id === action.payload
      );

      if (toggledNewsIndex !== -1) {
        state.selectedIds.splice(toggledNewsIndex, 1);
      } else {
        state.selectedIds.push(action.payload);
      }
    },
  },
});

export const selectSelectedIds = (state: RootState) =>
  state.newsReducer.selectedIds;

export const { toggleSelectNews } = newsSlice.actions;

export default newsSlice.reducer;
