import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Form {
  firstName: string;
  lastName: string;
  millionaire: boolean;
  money: number;
  description: string;
}

const formSlice = createSlice({
  name: "forSlice",
  initialState: {} as Form,
  reducers: {
    addToStore: (state, { payload }) => {
      if (payload) {
        return (state = payload);
      }
    },
  },
});

export const { addToStore } = formSlice.actions;

export default formSlice.reducer;
