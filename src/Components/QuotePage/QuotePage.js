import React, { Component } from 'react'
import './QuotePage.css'
import axios from 'axios'
import { connect } from 'react-redux'
import store, { loginWithTwitter } from '../../store'
import { Button, Icon, Card } from 'semantic-ui-react'
class QuotePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: {},
      user: null
    }
    // This will fetch a new quote from the API and also set the background to a random color from an assortment.
    this.handleGetNewQuote = () => {
      const colors = [
        '#593F62',
        '#7B6D8D',
        '#8499B1',
        '#A5C4D4'
      ]
      let randoColor = colors[Math.floor(Math.random() * colors.length)]
      console.log(randoColor)
      document.body.style.background = randoColor
      this.getNewQuote()
    }
    this.getNewQuote = () => {
      axios({
        method: 'get',
        cache: false,
        Pragma: 'no-cache',
        // Appending the date and time to the request allows for get requests to be unique and lets getNewQuote make new requests instead of reusing cached requests
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1' + '&' + (new Date()).getTime()
      })
        .then(newQuote => {
          this.setState({
            quote: newQuote
          })
        })
        .catch(err => console.log(err))
    }
    // The request from the quote page comes in on a <p> tag. The stripHTML function creates a temporary div to store the quote, and then grabs the innerHTML as a string
    this.stripHTMLTag = (html) => {
      var tmp = document.createElement('DIV')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    }
    this.loginWithTwitter = () => {
      console.log('hello')
      axios.get('http://localhost:8080/login')
        .then(res =>
          res.data
        )
        .catch(console.error())
    }
  }
  componentDidMount () {
    axios.get('http://localhost:8080/', {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res =>
        res.data
      )
      .then(user =>
        this.setState({user: user})
      )
      .catch(console.error())

    this.props.connectLoginWithTwitter()
  }

  render () {
    console.log(this.props.user)
    let quoteText = null
    let quoteAuthor = null

    if (this.state.quote.data) {
      quoteText = this.stripHTMLTag(this.state.quote.data[0].content)
      quoteAuthor = this.stripHTMLTag(this.state.quote.data[0].title)
    } else {
      this.handleGetNewQuote()
    }

    return (
      <div>
        {(this.props.user) ? <p>{this.props.user.username}</p> : <p>not logged in</p>}
        <div className="cardContainer">
          <Card className='quoteCard'>
            <Card.Content>
              <Card.Header>
                {quoteAuthor}
              </Card.Header>
              <Card.Description>
                {quoteText}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => this.handleGetNewQuote() }>New Quote</Button>
              {/* Appends the quoteText to twitter's URL for posting. */}
              <a href={'https://twitter.com/intent/tweet?text=' + '"' + quoteText + '" '} data-show-count="false">
                <Icon name='twitter square' size='big' />
              </a>
            </Card.Content>
          </Card>
        </div>

        <Button>
          <a href={'http://localhost:8080/login'}>
            <Icon name='twitter' size='big' />
            Login with Twitter
          </a>
        </Button>

      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return ({
    user: state.login
  })
}

const mapDispatchToProps = function (dispatch) {
  return {
    connectLoginWithTwitter (login) {
      dispatch(loginWithTwitter(login))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(QuotePage)
