import { configureStore } from '@reduxjs/toolkit';
import filter from './slice/filterSlice';
import paginate from './slice/paginateSlice';

export const store = configureStore({
  reducer: {
    filter,
    paginate,
  },
});
