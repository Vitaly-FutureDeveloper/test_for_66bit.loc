import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reductorReducer from "./reductor-reducer";



const reducers = combineReducers({
	reductorPage: reductorReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));


// window.store = store;
export default store;