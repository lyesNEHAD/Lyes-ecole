import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentView: 'dashboard', // 'dashboard', 'checklist', 'form'
  selectedChecklistId: null,
  editingTaskId: null,
  editText: '',
  newTaskText: '',
  saving: false,
  formData: {
    title: '',
    description: '',
  },
  formTasks: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Navigation
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },

    setSelectedChecklistId: (state, action) => {
      state.selectedChecklistId = action.payload;
    },

    // Task editing
    setEditingTaskId: (state, action) => {
      state.editingTaskId = action.payload;
    },

    setEditText: (state, action) => {
      state.editText = action.payload;
    },

    clearEditingState: (state) => {
      state.editingTaskId = null;
      state.editText = '';
    },

    // Form task adding
    setNewTaskText: (state, action) => {
      state.newTaskText = action.payload;
    },

    // Form data
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    setFormTitle: (state, action) => {
      state.formData.title = action.payload;
    },

    setFormDescription: (state, action) => {
      state.formData.description = action.payload;
    },

    clearFormData: (state) => {
      state.formData = { title: '', description: '' };
      state.formTasks = [];
      state.newTaskText = '';
    },

    // Form tasks
    addFormTask: (state, action) => {
      state.formTasks.push(action.payload);
      state.newTaskText = '';
    },

    updateFormTask: (state, action) => {
      const { taskId, text } = action.payload;
      const task = state.formTasks.find(t => t.id === taskId);
      if (task) {
        task.text = text;
      }
    },

    deleteFormTask: (state, action) => {
      state.formTasks = state.formTasks.filter(t => t.id !== action.payload);
    },

    toggleFormTask: (state, action) => {
      const task = state.formTasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    setSaving: (state, action) => {
      state.saving = action.payload;
    },
  },
});

export const {
  setCurrentView,
  setSelectedChecklistId,
  setEditingTaskId,
  setEditText,
  clearEditingState,
  setNewTaskText,
  setFormData,
  setFormTitle,
  setFormDescription,
  clearFormData,
  addFormTask,
  updateFormTask,
  deleteFormTask,
  toggleFormTask,
  setSaving,
} = uiSlice.actions;

export default uiSlice.reducer;