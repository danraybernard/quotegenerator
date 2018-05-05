import fetch from 'cross-fetch'

export const TWITTER_LOGIN = 'TWITTER_LOGIN'
export const TWITTER_LOGOUT = 'TWITTER_LOGOUT'

const initialState = {
  user: {}
}

function twitterLogin (user) {
  const action = { type: TWITTER_LOGIN, user }
  return action
}

function twitterLogout () {
  const action = { type: TWITTER_LOGOUT, user: {} }
  return action
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TWITTER_LOGIN:
      return { user: action.user }
    case TWITTER_LOGOUT:
      return { user: action.user }
    default: return state
  }
}

export function loginWithTwitter () {
  return function thunk (dispatch) {
    fetch('http://localhost:8080/getUser', { credentials: 'include' })
      .then(res => res.json())
      .then((user) => {
        if (user.username) {
          const action = twitterLogin(user)
          dispatch(action)
        }
      })
      .catch(err => err)
  }
}

export function logoutWithTwitter () {
  return function thunk (dispatch) {
    fetch('http://localhost:8080/logout', { credentials: 'include' })
      .catch(err => err)
    const action = twitterLogout()
    dispatch(action)
  }
}
