import React, { Component } from 'react'
import './Header.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginWithTwitter } from '../../store'
import { Button, Icon } from 'semantic-ui-react'
import fetch from 'cross-fetch'

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
    this.getUser = this.getUser.bind(this)
  }

  async getUser () {
    console.log('run getuser')
    // // for some reason headers are not set
    // axios({
    //   method: 'get',
    //   url: 'http://localhost:8080/',
    //   responseType: 'json',
    //   headers: {'Access-Control-Allow-Origin': '*'}
    // })
    //   .then(res =>
    //     // res.data
    //     console.log('got res', res)
    //   )
    //   // .then(user =>
    //   //   user
    //   //     ? this.setState({
    //   //       user: user
    //   //     })
    //   //     : console.log('no')
    //   // )
    //   .catch(console.error())

    await fetch('/getUser', {headers: {'Accept': 'application/json'}})
      .then(res => {
        return res.json()
      })
      .then(user => {
        this.setState({user: user})
      })
      .catch(err => {
        console.error(err)
      })
  }

  componentDidMount () {
    this.getUser()
  }

  // FOR SOME REASON THE API CALL IS RUN TWICE

  render () {
    // console.log(this.state)
    // if (this.state.user === {}) {
    // }
    console.log(this.state)
    return (
      <div>
        { this.state.user.username ? <div> <p>{this.state.user.username}</p></div>
          : <a href={'http://localhost:8080/login'}>
            <Button>
              <Icon name='twitter' size='big' />
          Login with Twitter
            </Button>
          </a>}
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return ({
    user: state.user
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
)(Header)
