import type { ModalState } from '@/types/modal.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: 'globalModal',
  initialState,
  reducers: {
    openModalAction(
      state: ModalState,
      action: PayloadAction<{ content: ModalState['content'] }>
    ) {
      state.isOpen = true;
      state.content = action.payload.content;
    },
    closeModalAction(state: ModalState) {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const { openModalAction, closeModalAction } = modalSlice.actions;
