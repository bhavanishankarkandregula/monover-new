import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, compose, combineReducers, applyMiddleware } from "redux"
import reducer from "./store/reducers/active"
import organizationReducer from "./store/reducers/organizationReducer"
import { ImageProvider } from "./components/ImageContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { UserContext, UserProvider } from "./components/UserContext"
import AlertTemplate from "react-alert-template-basic"
import { positions, Provider as AlertProvider } from "react-alert"
import "react-datasheet/lib/react-datasheet.css"

const composeEnhancers = process.env.NODE_ENV
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose

const rootReducer = combineReducers({
  active: reducer,
  organizationReducer: organizationReducer
})
const store = createStore(rootReducer)
global.store = store

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <ImageProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ImageProvider>
      </BrowserRouter>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
