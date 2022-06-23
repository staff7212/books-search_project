
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import {useHttp} from '../../hooks/http.hook';
import {_transformBooks} from '../../services/services';

const booksAdapter = createEntityAdapter();

const initialState = booksAdapter.getInitialState({
  booksLoadingStatus: 'idle',
  newLoading: true,
  totalBooks: 0,
  requestData: {},
})

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({book, categories, sort, offset = 0}) => {
    const {request} = useHttp();
    const data = await request(`https://www.googleapis.com/books/v1/volumes?q=${book}+subject:${categories}&orderBy=${sort}&startIndex=${offset}&maxResults=30&key=AIzaSyBclm2K1S0p_nYdEpB-arrL6CVrbFUltRo`);
    return {data, offset};
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addRequestData: (state, action) => {
      state.requestData = action.payload;
      state.newLoading = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.booksLoadingStatus = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.booksLoadingStatus = 'idle';
        state.newLoading = false;
        action.payload.offset === 0 ? 
          booksAdapter.setAll(state, action.payload.data.items.map(_transformBooks))
          : booksAdapter.setMany(state, action.payload.data.items.map(_transformBooks))
        
        state.totalBooks = action.payload.data.totalItems;
      })
      .addCase(fetchBooks.rejected, state => {
        state.newLoading = false;
        state.booksLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const { actions, reducer} = booksSlice;

export default reducer;

export const { addRequestData } = actions;

export const {selectAll, selectById} = booksAdapter.getSelectors(state => state.books);
