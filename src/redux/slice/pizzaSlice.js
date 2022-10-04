import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async ({ page, category, sort, order, search }) => {
    const response = await axios.get(
      `https://6321e67782f8687273bc24b7.mockapi.io/pizzas?page=${page}&limit=8${
        category ? '&category=' + category : ''
      }&sortBy=${sort.sortTitle}&order=${order ? 'desc' : 'asc'}${search && '&search=' + search}`,
    );
    return response.data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
