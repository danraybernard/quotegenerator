import React, { Component } from 'react'
import NewQuoteButton from './Components/NewQuoteButton/NewQuoteButton.js'
import logo from './logo.svg'
import './App.css'
import Quote from './Components/QuotePage/QuotePage.js'
class App extends Component {
  render () {
    return (
      <div className="App">
        <script async src="https://platform.twitter.com/widgets.js" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Quote/>

      </div>
    )
  }
}

export default App
