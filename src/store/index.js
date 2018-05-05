import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import header from './header'
import quotePage from './quotePage'

const reducer = combineReducers({ header, quotePage })

const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store
export * from './header'
export * from './quotePage'
