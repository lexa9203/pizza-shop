import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
      const findItem = state.cartItems.find(
        (el) =>
          el.sizes === action.payload.sizes &&
          el.type === action.payload.type &&
          el.title === action.payload.title,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => (sum += obj.price * obj.count), 0);
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((item) => {
        return item.key !== action.payload;
      });
      state.totalPrice = state.cartItems.reduce((sum, obj) => (sum += obj.price * obj.count), 0);
    },

    decrementPizza(state, action) {
      const findPizza = state.cartItems.find((item) => {
        return item.key === action.payload;
      });
      if (findPizza) {
        findPizza.count--;
        if (!findPizza.count) {
          state.cartItems = state.cartItems.filter((el) => el.key !== findPizza.key);
        }
        state.totalPrice = state.cartItems.reduce((sum, obj) => (sum += obj.price * obj.count), 0);
      }
    },

    clearItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const selectorCart = (state) => state.cart;

export const selectorCartItems =
  ({ activeSize, activeType, title }) =>
  (state) =>
    state.cart.cartItems.find(
      (el) => el.sizes === activeSize && el.type === activeType && el.title === title,
    );

export const { addToCart, removeItem, clearItems, decrementPizza } = cartSlice.actions;

export default cartSlice.reducer;
