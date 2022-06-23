import { configureStore } from '@reduxjs/toolkit';
import books from '../components/booksList/booksSlice'

export const store = configureStore({
  reducer: {books},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})
