import axios from 'axios'

export const GET_NEW_QUOTE = 'GET_NEW_QUOTE'

const initialState = {
  quote: {}
}

function getQuote (quote) {
  const action = { type: GET_NEW_QUOTE, quote }
  return action
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEW_QUOTE:
      return { quote: action.quote }
    default: return state
  }
}

export function getNewQuote () {
  return function thunk (dispatch) {
    axios({
      method: 'get',
      cache: false,
      Pragma: 'no-cache',
      /* Appending the date and time to the request allows for get requests to be unique.
      Lets getNewQuote make new requests instead of reusing cached requests */
      url: `${'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1' + '&'}${(new Date()).getTime()}`
    })
      .then((newQuote) => {
        if (newQuote.data) {
          const action = getQuote(newQuote)
          dispatch(action)
        }
      })
      .catch(err => err)
  }
}
