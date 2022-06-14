import { combineReducers } from "redux";
import host from "./host";
import guest from "./guest";

const rootReducer = combineReducers({
    host,
    guest,
});

export default rootReducer;