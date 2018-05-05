import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Button, Icon, Card } from 'semantic-ui-react'
import { getNewQuote } from '../../store/quotePage'
import './QuotePage.css'

class QuotePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    /* This will fetch a new quote from the API.
    Also sets the background to a random color from an assortment. */
    this.handleGetNewQuote = () => {
      const colors = [
        '#593F62',
        '#7B6D8D',
        '#8499B1',
        '#A5C4D4'
      ]
      const randoColor = colors[Math.floor(Math.random() * colors.length)]
      document.body.style.background = randoColor
      this.props.connectGetNewQuote()
    }

    /* The request comes in on a <p> tag. stripHTML creates a temporary div to store the quote
    Also grabs the innerHTML as a string */
    this.stripHTMLTag = (html) => {
      const tmp = document.createElement('DIV')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    }
  }

  render () {
    let quoteText = null
    let quoteAuthor = null
    if (this.props.quote.data) {
      quoteText = this.stripHTMLTag(this.props.quote.data[0].content)
      quoteAuthor = this.stripHTMLTag(this.props.quote.data[0].title)
    } else {
      this.props.connectGetNewQuote()
    }

    return (
      <div>

        <div className="cardContainer">
          <Card className="quoteCard">
            <Card.Content>

              <Card.Header>
                {quoteAuthor}
              </Card.Header>

              <Card.Description>
                {quoteText}
              </Card.Description>

            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => this.handleGetNewQuote()}>New Quote</Button>
              {/* Appends the quoteText to twitter's URL for posting. */}
              <a href={`${'https://twitter.com/intent/tweet?text=' + '"'}${quoteText}" `} data-show-count="false">
                <Icon name="twitter square" size="big" />
              </a>
            </Card.Content>
          </Card>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  quote: state.quotePage.quote
})

const mapDispatchToProps = dispatch => ({
  connectGetNewQuote (quote) {
    dispatch(getNewQuote(quote))
  }
})

QuotePage.defaultProps = {
  quote: {}
}

QuotePage.propTypes = {
  connectGetNewQuote: propTypes.func.isRequired,
  quote: propTypes.shape({ data: propTypes.array })
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotePage)
