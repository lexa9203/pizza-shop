import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'all',
  sort: { name: 'популярности', sortTitle: 'rating' },
  order: true,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
  },
});

export const { setActiveCategory, setSort, setOrder } = filterSlice.actions;

export default filterSlice.reducer;
