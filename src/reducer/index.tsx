import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import host from "./host";
import guest from "./guest";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["host", "guest"],
}

const rootReducer = combineReducers({
    host,
    guest,
});

export default persistReducer(persistConfig, rootReducer);
export type IRootState = ReturnType<typeof rootReducer>;