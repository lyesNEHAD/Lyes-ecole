import { configureStore } from '@reduxjs/toolkit';
import checklistReducer from './slices/checklistSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    checklists: checklistReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store