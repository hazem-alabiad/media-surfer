import mediaDetailsReducer from "reducers/mediaDetailsReducer";
import mediasReducer from "reducers/mediasReducer";
import { reducer as formReducer } from "redux-form";
import logger from "redux-logger";
import thunk from "redux-thunk";

const {
  loadPersistState,
  persistState,
} = require("helpers/localStorageHelpers");
const {
  combineReducers,
  compose,
  createStore,
  applyMiddleware,
} = require("redux");

const persistentState = loadPersistState();

const rootReducer = combineReducers({
  form: formReducer,
  medias: mediasReducer,
  mediaDetails: mediaDetailsReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  persistentState,
  composeEnhancers(applyMiddleware(thunk, logger))
);

store.subscribe(() => {
  persistState(store.getState());
});

export default store;
