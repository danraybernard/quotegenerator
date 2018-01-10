import React, { Component } from 'react'
import './QuotePage.css'
import axios from 'axios'
import { Button, Icon, Card } from 'semantic-ui-react'
class QuotePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: {}
    }
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
  }
  componentDidMount () {
  }

  render () {
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
              <a href={'https://twitter.com/intent/tweet?text=' + '"' + quoteText + '" '} data-show-count="false">
                <Icon name='twitter square' size='big' />
              </a>
            </Card.Content>
          </Card>
        </div>
      </div>
    )
  }
}

export default QuotePage