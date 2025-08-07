import { createSlice } from '@reduxjs/toolkit';

const ideaSlice = createSlice({
    name: 'ideas',
    initialState: {
        generatedIdeas: [],
    },
    reducers: {
        addGeneratedIdea(state, action) {
            state.generatedIdeas.push(action.payload);
        },
        deleteGeneratedIdea(state, action) {
            state.generatedIdeas = state.generatedIdeas.filter(
                (idea) => idea.id !== action.payload
            );
        },
        // NEW: Clear all generated ideas
        clearAllGeneratedIdeas(state) {
            state.generatedIdeas = [];
        },
    },
});

export const {
    addGeneratedIdea,
    deleteGeneratedIdea,
    clearAllGeneratedIdeas, // Export the new action
} = ideaSlice.actions;

export default ideaSlice.reducer;
