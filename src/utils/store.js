import {configureStore} from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import channelIdSlice from "./channelIdSlice";

import chatSlice from "./chatSlice";

const store = configureStore({
    reducer: {
        app: appSlice,
        search: searchSlice,
        chat: chatSlice,
        channelId:channelIdSlice
    },
});

export default store;