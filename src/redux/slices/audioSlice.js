import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        isRecording: false,
        recordedUri: null, // URI of the saved audio file
        recordingDuration: 0, // Duration in seconds
        recordingError: null,
    },
    reducers: {
        // Action to start recording
        startRecording(state) {
            state.isRecording = true;
            state.recordedUri = null;
            state.recordingDuration = 0;
            state.recordingError = null;
        },
        // Action to stop recording and save URI
        stopRecording(state, action) {
            state.isRecording = false;
            state.recordedUri = action.payload.uri;
            state.recordingDuration = action.payload.duration; // Duration should be passed here
        },
        // Action to reset recording state
        resetRecording(state) {
            state.isRecording = false;
            state.recordedUri = null;
            state.recordingDuration = 0;
            state.recordingError = null;
        },
        // Action for recording errors
        setRecordingError(state, action) {
            state.isRecording = false; // Stop recording on error
            state.recordingError = action.payload;
        },
        // Action to update recording duration (called periodically)
        updateRecordingDuration(state, action) {
            if (state.isRecording) {
                state.recordingDuration = action.payload;
            }
        },
    },
});

export const {
    startRecording,
    stopRecording,
    resetRecording,
    setRecordingError,
    updateRecordingDuration,
} = audioSlice.actions;

export default audioSlice.reducer;
