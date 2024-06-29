import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  userReducer,
  servicesReducer,

} from "src/reducers";
import thunkMiddleware from "redux-thunk";

const initialState = {
  sidebarShow: "responsive",
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  changeState: changeState,
  user: userReducer,
  // provinces: provinceReducer,
  // carTypes: carTypeReducer,
  // districts: districtReducer,
  services: servicesReducer,
  // notification: notificationReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);
export default store;
