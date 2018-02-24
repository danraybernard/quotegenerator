import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import rootReducer from './reducers'
import fetch from 'cross-fetch'
export const TWITTER_LOGIN = 'TWITTER_LOGIN'

export function twitterLogin (user) {
  const action = { type: TWITTER_LOGIN, user }
  return action
}

export function loginWithTwitter () {
  return async function thunk (dispatch) {
    console.log('run once')
    await fetch('http://localhost:8080/getUser', {credentials: 'include'})
      .then(res => {
        return res.json()
      })
      .then(user => {
        if (user.username) {
          const action = twitterLogin(user)
          dispatch(action)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
