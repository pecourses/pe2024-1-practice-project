import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';

const TRANSACTIONS_SLICE_NAME = 'transactions';

const initialState = {
  transactions: [],
  isFetching: true,
  error: null,
};

// /transactions/get
export const getTransactionsThunk = createAsyncThunk(
  `${TRANSACTIONS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.getTransactions();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTransactionsThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTransactionsThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.transactions = [...payload];
    });
    builder.addCase(getTransactionsThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = transactionsSlice;

export default reducer;
