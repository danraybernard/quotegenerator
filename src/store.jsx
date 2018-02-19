import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import rootReducer from './reducers'

export const TWITTER_LOGIN = 'TWITTER_LOGIN'

export function twitterLogin (user) {
  const action = { type: TWITTER_LOGIN, user }
  return action
}

export function loginWithTwitter () {
  return function thunk (dispatch) {
    axios({
      method: 'get',
      url: 'http://localhost:8080/',
      responseType: 'json',
      headers: {'Access-Control-Allow-Origin': '*'}
    })
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
