import React, { Component } from 'react'
import './QuotePage.css'
import axios from 'axios'
class QuotePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: {}
    }
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://quotesondesign.com/api/3.0/api-3.0.json'
      // headers: {
      //   'Access-Control-Allow-Origin': '*'
      // }
    })
      .then(quote => {
        console.log(quote)
        this.setState({
          quote: quote
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    console.log(this.state)
    return (
      <div> HEY! </div>
    )
  }
}

export default QuotePage
