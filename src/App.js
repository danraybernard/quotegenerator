import React, { Component } from 'react'
import './App.css'
import Quote from './Components/QuotePage/QuotePage.jsx'
import Header from './Components/Header/Header.jsx'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import UserPage from './Components/UserPage/UserPage'

class App extends Component {
  render () {
    return (
      <div className="App">
        <script async src="https://platform.twitter.com/widgets.js" />
        <header className="App-header">
          <div className="home">
            <Link to="/">
              <Icon name="home" size="big" />
            </Link>
          </div>
          <div className="login">
            <Header />
          </div>
          <div className="title">
            <h1>Quotes on life, design and everything else</h1>
          </div>
        </header>
        <Switch>
          <Route exact path="/" render={() => <Quote />} />
          <Route exact path="/user" render={() => <UserPage />} />
        </Switch>
      </div>
    )
  }
}

export default App
