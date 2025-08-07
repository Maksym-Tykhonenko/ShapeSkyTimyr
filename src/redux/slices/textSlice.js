import { createSlice } from '@reduxjs/toolkit';

const textSlice = createSlice({
    name: 'text',
    initialState: {
        storyText: '',
        isEditing: false,
        savedText: null,
        writtenStories: [],
    },
    reducers: {
        startEditing(state, action) {
            state.isEditing = true;
            state.storyText = action.payload || '';
        },
        updateStoryText(state, action) {
            state.storyText = action.payload;
        },
        saveStoryText(state, action) {
            state.isEditing = false;
            state.savedText = state.storyText;
            state.writtenStories.push({
                id: Date.now().toString(),
                text: state.storyText,
                date: new Date().toISOString().split('T')[0],
                title: action.payload.title || 'Новая текстовая история',
                question: action.payload.question || 'Вопрос не указан',
            });
            state.storyText = '';
        },
        cancelEditing(state) {
            state.isEditing = false;
            state.storyText = '';
        },
        loadSavedText(state) {
            state.storyText = state.savedText || '';
            state.isEditing = true;
        },
        deleteWrittenStory(state, action) {
            state.writtenStories = state.writtenStories.filter(
                (story) => story.id !== action.payload
            );
        },
        // NEW: Clear all written stories
        clearAllWrittenStories(state) {
            state.writtenStories = [];
            state.savedText = null; // Also clear the temporary draft
            state.storyText = ''; // Ensure current editing text is cleared too
            state.isEditing = false;
        },
    },
});

export const {
    startEditing,
    updateStoryText,
    saveStoryText,
    cancelEditing,
    loadSavedText,
    deleteWrittenStory,
    clearAllWrittenStories, // Export the new action
} = textSlice.actions;

export default textSlice.reducer;
