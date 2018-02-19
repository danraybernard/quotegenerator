import { TWITTER_LOGIN } from '../store'

const initialState = {
  user: {}
}

const rootReducer = function (state = initialState, action) {
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case TWITTER_LOGIN:
      nextState.user = action.user
      return nextState

    default: return state
  }
}

export default rootReducer
