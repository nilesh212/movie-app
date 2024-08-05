import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";

//function logger(obj)(next)(action);
//{dispatch,getState} are from store obj.
// function logger({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       console.log("Action Type: ", action.type);
//       next(action);
//     };
//   };
// }

const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action !== "function") console.log("Action Type: ", action.type);
    next(action);
  };

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       action(dispatch);
//       return;
//     }
//     next(action);
//   };

// import reportWebVitals from "./reportWebVitals";
const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log(store);

// export const StoreContext = createContext();

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>;
//   }
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
