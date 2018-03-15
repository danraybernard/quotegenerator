import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import rootReducer from './reducers'
import fetch from 'cross-fetch'
export const TWITTER_LOGIN = 'TWITTER_LOGIN'
export const TWITTER_LOGOUT = 'TWITTER_LOGOUT'
export function twitterLogin (user) {
  const action = { type: TWITTER_LOGIN, user }
  return action
}

export function twitterLogout () {
  const action = { type: TWITTER_LOGOUT, user: {} }
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

export function logoutWithTwitter () {
  return function thunk (dispatch) {
    fetch('http://localhost:8080/logout', {credentials: 'include'})
      .catch(err => {
        console.log(err)
      })
    const action = twitterLogout()
    dispatch(action)
  }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
