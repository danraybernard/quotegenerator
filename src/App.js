import React, { Component } from 'react'
import './App.css'
import Quote from './Components/QuotePage/QuotePage.js'
import Header from './Components/Header/Header.js'
class App extends Component {
  render () {
    return (
      <div className="App">
        <script async src="https://platform.twitter.com/widgets.js" />
        <header className="App-header">
          <div className="login">
            <Header />
          </div>
          <h1>Quotes on life, design and everything else</h1>
        </header>
        <Quote/>
      </div>
    )
  }
}

export default App
