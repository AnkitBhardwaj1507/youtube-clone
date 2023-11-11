import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: []
    },

    reducers: {
        addMessage: (state, action) => {

            // state.messagesessage.splice(10,1);
            // state.messagesessage.unshift(action.payload);
            state.messages.push(action.payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;