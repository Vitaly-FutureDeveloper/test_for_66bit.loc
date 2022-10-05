import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import redactorReducer from "./redactor-reducer";


const reducers = combineReducers({
	redactorPage: redactorReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;