import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Services/api';

// Async thunks for API calls
export const fetchChecklists = createAsyncThunk(
  'checklists/fetchChecklists',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllChecklists();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewChecklist = createAsyncThunk(
  'checklists/addNewChecklist',
  async (checklistData, { rejectWithValue }) => {
    try {
      const response = await api.addChecklist(
        checklistData.title,
        checklistData.description,
        checklistData.todo || []
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateChecklistAsync = createAsyncThunk(
  'checklists/updateChecklistAsync',
  async (checklistData, { rejectWithValue }) => {
    try {
      const response = await api.updateChecklist(
        checklistData.id,
        checklistData.title,
        checklistData.description,
        checklistData.todo
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteChecklistAsync = createAsyncThunk(
  'checklists/deleteChecklistAsync',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteChecklist(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: true,
  error: null,
};

const checklistSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {
    // Synchronous actions
    updateChecklist: (state, action) => {
      const checklist = state.items.find(c => c.id === action.payload.id);
      if (checklist) {
        Object.assign(checklist, action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    // Fetch checklists
    builder
      .addCase(fetchChecklists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchChecklists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch checklists';
      });

    // Add new checklist
    builder
      .addCase(addNewChecklist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewChecklist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addNewChecklist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create checklist';
      });

    // Update checklist
    builder
      .addCase(updateChecklistAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateChecklistAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update checklist';
      });

    // Delete checklist
    builder
      .addCase(deleteChecklistAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(deleteChecklistAsync.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete checklist';
      });
  },
});

export const { updateChecklist } = checklistSlice.actions;
export default checklistSlice.reducer;