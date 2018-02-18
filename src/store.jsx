import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import rootReducer from './reducers'

export const TWITTER_LOGIN = 'TWITTER_LOGIN'

export function twitterLogin (login) {
  const action = { type: TWITTER_LOGIN, login }
  return action
}

export function loginWithTwitter () {
  return function thunk (dispatch) {
    axios.get('https://vast-coast-12235.herokuapp.com/', {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res =>
        res.data
      )
      .then(user => {
        const action = twitterLogin(user)
        dispatch(action)
      })
      .catch(console.error())
  }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))